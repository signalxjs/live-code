#!/usr/bin/env npx tsx

/**
 * Generates `src/types/generated-modules.ts` — the sigx-ecosystem ambient
 * `.d.ts` blobs that get fed to Monaco as `extraLibs` so the live editor has
 * IntelliSense for `sigx`, `@sigx/router`, `@sigx/store`, and `@sigx/daisyui`.
 *
 * Uses `dts-bundle-generator` to produce a single bundled `.d.ts` per package
 * so we don't have to hand-maintain types or worry about cross-file imports.
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'fs';
import { dirname, join, resolve, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

/**
 * Resolve a package's bundled .d.ts entry from node_modules.
 * Walks upward from ROOT looking for node_modules/<pkgName>/package.json,
 * then uses the package.json `types` field.
 */
function resolvePackageTypes(pkgName: string): string {
    let dir = ROOT;
    while (true) {
        const candidate = join(dir, 'node_modules', pkgName, 'package.json');
        if (existsSync(candidate)) {
            try {
                const pkgJson = JSON.parse(readFileSync(candidate, 'utf-8'));
                const typesField =
                    pkgJson.types ||
                    pkgJson.typings ||
                    pkgJson.exports?.['.']?.types ||
                    pkgJson.exports?.['.']?.import?.types ||
                    'dist/index.d.ts';
                return resolve(dirname(candidate), typesField);
            } catch {
                return '';
            }
        }
        const parent = dirname(dir);
        if (parent === dir) return '';
        dir = parent;
    }
}

// Path to the JSX types file (shipped by @sigx/runtime-dom on npm)
const JSX_SOURCE = (() => {
    const runtimeDomTypes = resolvePackageTypes('@sigx/runtime-dom');
    if (runtimeDomTypes) {
        return resolve(dirname(runtimeDomTypes), 'jsx.d.ts');
    }
    return '';
})();

// Temporary directory for bundled .d.ts files
const TEMP_DIR = join(ROOT, '.temp-types');
const OUTPUT_DIR = join(ROOT, 'src/types');
const OUTPUT_FILE = join(OUTPUT_DIR, 'generated-modules.ts');

interface ModuleConfig {
    name: string;
    entryPoint: string;
    globalVar: string;
    /**
     * Additional packages to force-inline. By default we always inline the
     * module's own package (because its .d.ts lives in node_modules, which
     * dts-bundle-generator otherwise treats as an external dependency that
     * should be left as `import` statements).
     */
    extraInlines?: string[];
}

const MODULES: ModuleConfig[] = [
    {
        name: 'sigx',
        entryPoint: resolvePackageTypes('sigx'),
        globalVar: '__SIGX__',
        // sigx's index.d.ts is just re-exports from these subpackages.
        extraInlines: ['@sigx/reactivity', '@sigx/runtime-core', '@sigx/runtime-dom'],
    },
    {
        name: '@sigx/router',
        entryPoint: resolvePackageTypes('@sigx/router'),
        globalVar: '__SIGX_ROUTER__',
    },
    {
        name: '@sigx/store',
        entryPoint: resolvePackageTypes('@sigx/store'),
        globalVar: '__SIGX_STORE__',
    },
    {
        name: '@sigx/daisyui',
        entryPoint: resolvePackageTypes('@sigx/daisyui'),
        globalVar: '__SIGX_DAISYUI__',
    },
];

function ensureDir(dir: string) {
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
}

function cleanDir(dir: string) {
    if (existsSync(dir)) {
        rmSync(dir, { recursive: true, force: true });
    }
    mkdirSync(dir, { recursive: true });
}

/**
 * Bundle a single module's types using dts-bundle-generator
 */
function bundleModuleTypes(config: ModuleConfig): string {
    const outputFile = join(TEMP_DIR, `${config.name.replace(/[^a-z0-9]/gi, '-')}.d.ts`);
    
    console.log(`  📦 Bundling ${config.name}...`);
    
    if (!existsSync(config.entryPoint)) {
        console.warn(`    ⚠️  Entry point not found: ${config.entryPoint}`);
        return '';
    }

    try {
        // Always force-inline the module's own package (since the entry .d.ts
        // lives in node_modules, dts-bundle-generator otherwise emits empty
        // bundles with bare import statements).
        const inlines = [config.name, ...(config.extraInlines ?? [])];
        const cmd = [
            'npx dts-bundle-generator',
            `"${config.entryPoint}"`,
            `-o "${outputFile}"`,
            '--no-banner',
            '--no-check',
            ...inlines.map((p) => `--external-inlines ${p}`),
        ].join(' ');
        
        execSync(cmd, { 
            cwd: ROOT,
            stdio: 'pipe',
            encoding: 'utf-8'
        });
        
        if (existsSync(outputFile)) {
            const content = readFileSync(outputFile, 'utf-8');
            console.log(`    ✅ Generated ${(content.length / 1024).toFixed(2)} KB`);
            return content;
        }
    } catch (error: any) {
        console.error(`    ❌ Failed to bundle ${config.name}:`, error.message);
    }
    
    return '';
}

/**
 * Wrap bundled types in a module declaration
 */
function wrapAsModule(moduleName: string, content: string): string {
    // Remove any 'export {};' at the end
    content = content.replace(/export\s*\{\s*\}\s*;?\s*$/g, '');
    
    // Remove any 'declare global { namespace JSX { ... } }' blocks - we handle these separately
    content = content.replace(/declare\s+global\s*\{[\s\S]*?namespace\s+JSX\s*\{[\s\S]*?\}\s*\}/g, '');
    
    // Indent content
    const indented = content
        .split('\n')
        .map(line => line ? '    ' + line : '')
        .join('\n');
    
    return `declare module "${moduleName}" {\n${indented}\n}`;
}

/**
 * Extract JSX global types from runtime-dom/src/jsx.tsx
 * 
 * Key insight: Monaco requires HTMLAttributes to be at TOP LEVEL, not inside namespace JSX.
 * The source file has HTMLAttributes inside JSX namespace, so we restructure:
 * 1. CSSProperties - already at top level
 * 2. HTMLAttributes, InputHTMLAttributes, etc. - MOVE to top level (extract from namespace)
 * 3. IntrinsicAttributes, IntrinsicElements - keep inside declare global { namespace JSX { } }
 */
function extractJsxGlobalTypes(): string {
    console.log('  📖 Extracting and restructuring JSX global types...');
    
    if (!existsSync(JSX_SOURCE)) {
        console.warn(`    ⚠️  JSX source not found: ${JSX_SOURCE}`);
        return getDefaultJsxTypes();
    }
    
    const content = readFileSync(JSX_SOURCE, 'utf-8');
    
    // Extract types before 'declare global' (CSSProperties, CSSNumericProperty)
    const globalStart = content.indexOf('declare global');
    if (globalStart === -1) {
        console.warn('    ⚠️  Could not find "declare global" in jsx.tsx');
        return getDefaultJsxTypes();
    }
    
    // Get everything before declare global (CSSProperties, etc.)
    let preGlobalTypes = content.slice(0, globalStart);
    preGlobalTypes = preGlobalTypes.replace(/import\s+.*?;/g, '');
    
    // Extract the declare global block
    let braceCount = 0;
    let inGlobal = false;
    let globalEnd = globalStart;
    
    for (let i = globalStart; i < content.length; i++) {
        if (content[i] === '{') {
            braceCount++;
            inGlobal = true;
        } else if (content[i] === '}') {
            braceCount--;
            if (inGlobal && braceCount === 0) {
                globalEnd = i + 1;
                break;
            }
        }
    }
    
    const globalBlock = content.slice(globalStart, globalEnd);
    
    // Find the namespace JSX content
    const jsxStart = globalBlock.indexOf('namespace JSX');
    if (jsxStart === -1) {
        console.warn('    ⚠️  Could not find "namespace JSX" in declare global');
        return getDefaultJsxTypes();
    }
    
    // Find the opening brace of namespace JSX
    let jsxBraceStart = globalBlock.indexOf('{', jsxStart);
    braceCount = 0;
    let jsxEnd = jsxBraceStart;
    
    for (let i = jsxBraceStart; i < globalBlock.length; i++) {
        if (globalBlock[i] === '{') {
            braceCount++;
        } else if (globalBlock[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
                jsxEnd = i;
                break;
            }
        }
    }
    
    // Get content inside namespace JSX { ... }
    const jsxContent = globalBlock.slice(jsxBraceStart + 1, jsxEnd);
    
    // Helper function to extract an interface by brace counting (handles nested braces in template literals)
    function extractInterface(content: string, interfaceName: string): string {
        const startMatch = content.match(new RegExp(`interface\\s+${interfaceName}\\s*\\{`));
        if (!startMatch) return '';
        
        const startPos = content.indexOf(startMatch[0]);
        let braces = 0;
        let endPos = startPos;
        
        for (let i = startPos; i < content.length; i++) {
            if (content[i] === '{') braces++;
            if (content[i] === '}') {
                braces--;
                if (braces === 0) {
                    endPos = i + 1;
                    break;
                }
            }
        }
        
        return content.slice(startPos, endPos).trim();
    }
    
    // Find IntrinsicAttributes using brace counting (handles template literal index signatures)
    const intrinsicAttrs = extractInterface(jsxContent, 'IntrinsicAttributes');
    
    // Find IntrinsicElements using brace counting
    const intrinsicElements = extractInterface(jsxContent, 'IntrinsicElements');
    
    // Extract ALL other type definitions from JSX namespace to put at top level
    // This includes: HTMLAttributes, FormElementAttributes, NumberInputAttributes, etc.
    // NOTE: IntrinsicAttributes stays in JSX namespace - we remove "extends IntrinsicAttributes" from HTMLAttributes
    const typesToExtract: string[] = [];
    
    // Match all interface definitions (except IntrinsicAttributes and IntrinsicElements which stay in JSX namespace)
    const interfaceRegex = /interface\s+(?!IntrinsicAttributes|IntrinsicElements)(\w+)(?:<[^>]*>)?\s*(?:extends\s+[^{]+)?\s*\{/g;
    let match;
    while ((match = interfaceRegex.exec(jsxContent)) !== null) {
        const startPos = match.index;
        let braces = 0;
        let endPos = startPos;
        for (let i = startPos; i < jsxContent.length; i++) {
            if (jsxContent[i] === '{') braces++;
            if (jsxContent[i] === '}') {
                braces--;
                if (braces === 0) {
                    endPos = i + 1;
                    break;
                }
            }
        }
        const extracted = jsxContent.slice(startPos, endPos).trim();
        typesToExtract.push(extracted);
    }
    
    // Match all type alias definitions (type Foo<T> = ...)
    const typeAliasRegex = /\n\s*type\s+\w+(?:<[^>]*>)?\s*=[^;]+;/g;
    let typeMatch;
    while ((typeMatch = typeAliasRegex.exec(jsxContent)) !== null) {
        typesToExtract.push(typeMatch[0].trim());
    }
    
    // Remove the leading indentation from extracted types
    // Also fix HTMLAttributes to not extend IntrinsicAttributes since IntrinsicAttributes
    // is a JSX namespace concept and we're moving HTMLAttributes to top level
    const cleanedTypes = typesToExtract.map(t => {
        let cleaned = t.replace(/^\s{8}/gm, '');
        // Remove "extends IntrinsicAttributes" from HTMLAttributes since it's now top-level
        cleaned = cleaned.replace(
            /interface\s+HTMLAttributes<([^>]+)>\s+extends\s+IntrinsicAttributes/,
            'interface HTMLAttributes<$1>'
        );
        return cleaned;
    });
    
    // Build the restructured output
    const topLevelInterfaces = [
        preGlobalTypes.trim(),
        '',
        '// JSX Attribute Interfaces at top level (extracted from namespace JSX)',
        ...cleanedTypes,
    ].filter(Boolean).join('\n\n');
    
    // Helper to properly indent interface content for JSX namespace
    function indentForJsxNamespace(content: string): string {
        const lines = content.split('\n');
        return lines.map((line, index) => {
            if (index === 0) {
                // First line (interface declaration) gets 4 spaces
                return '    ' + line.trim();
            } else if (line.trim() === '}') {
                // Closing brace gets 4 spaces
                return '    }';
            } else if (line.trim()) {
                // Content inside interface gets 8 spaces
                return '        ' + line.trim();
            }
            return '';
        }).filter(Boolean).join('\n');
    }
    
    // Build the JSX namespace using "declare namespace JSX" (NOT "declare global { namespace JSX }")
    // This is important for Monaco to properly resolve types from ambient declarations
    // NOTE: JSX.Element uses `any` to be compatible with the actual VNode/JSXElement types
    // from the sigx module. We can't define VNode here because it would conflict with
    // sigx's VNode (different `unique symbol` types).
    const newGlobalBlock = `
declare namespace JSX {
    // Use 'any' for Element to avoid conflicts with sigx's VNode type
    // Components return JSXElement which is compatible with any
    type Element = any;
    interface ElementClass { render: any; }
    interface ElementAttributesProperty { props: {}; }
    interface ElementChildrenAttribute { children: {}; }

${indentForJsxNamespace(intrinsicAttrs)}

${indentForJsxNamespace(intrinsicElements)}
}
`;
    
    const result = topLevelInterfaces + '\n\n' + newGlobalBlock;
    console.log(`    ✅ Restructured ${(result.length / 1024).toFixed(2)} KB (moved attribute interfaces to top level)`);
    
    return result;
}

/**
 * Fallback JSX types if extraction fails
 */
function getDefaultJsxTypes(): string {
    return `
type CSSNumericProperty = string | number;

interface CSSProperties {
    [key: string]: CSSNumericProperty | undefined;
}

declare global {
    namespace JSX {
        interface Element {}
        interface ElementClass { render: any; }
        interface ElementAttributesProperty { props: {}; }
        interface ElementChildrenAttribute { children: {}; }
        
        interface IntrinsicAttributes {
            key?: string | number;
            id?: string;
            class?: string;
            style?: string | CSSProperties;
        }
        
        interface HTMLAttributes<T = HTMLElement> extends IntrinsicAttributes {
            children?: any;
            ref?: (el: T) => void;
            onClick?: (e: MouseEvent) => void;
            onInput?: (e: InputEvent) => void;
            onChange?: (e: Event) => void;
            disabled?: boolean;
            type?: string;
            value?: string | number;
            placeholder?: string;
            href?: string;
            src?: string;
            alt?: string;
            [key: string]: any;
        }
        
        interface IntrinsicElements {
            div: HTMLAttributes<HTMLDivElement>;
            span: HTMLAttributes<HTMLSpanElement>;
            p: HTMLAttributes<HTMLParagraphElement>;
            a: HTMLAttributes<HTMLAnchorElement>;
            button: HTMLAttributes<HTMLButtonElement>;
            input: HTMLAttributes<HTMLInputElement>;
            textarea: HTMLAttributes<HTMLTextAreaElement>;
            select: HTMLAttributes<HTMLSelectElement>;
            form: HTMLAttributes<HTMLFormElement>;
            label: HTMLAttributes<HTMLLabelElement>;
            img: HTMLAttributes<HTMLImageElement>;
            h1: HTMLAttributes<HTMLHeadingElement>;
            h2: HTMLAttributes<HTMLHeadingElement>;
            h3: HTMLAttributes<HTMLHeadingElement>;
            h4: HTMLAttributes<HTMLHeadingElement>;
            h5: HTMLAttributes<HTMLHeadingElement>;
            h6: HTMLAttributes<HTMLHeadingElement>;
            ul: HTMLAttributes<HTMLUListElement>;
            ol: HTMLAttributes<HTMLOListElement>;
            li: HTMLAttributes<HTMLLIElement>;
            table: HTMLAttributes<HTMLTableElement>;
            thead: HTMLAttributes<HTMLTableSectionElement>;
            tbody: HTMLAttributes<HTMLTableSectionElement>;
            tr: HTMLAttributes<HTMLTableRowElement>;
            td: HTMLAttributes<HTMLTableCellElement>;
            th: HTMLAttributes<HTMLTableCellElement>;
            nav: HTMLAttributes<HTMLElement>;
            header: HTMLAttributes<HTMLElement>;
            footer: HTMLAttributes<HTMLElement>;
            main: HTMLAttributes<HTMLElement>;
            section: HTMLAttributes<HTMLElement>;
            article: HTMLAttributes<HTMLElement>;
            aside: HTMLAttributes<HTMLElement>;
            svg: HTMLAttributes<SVGSVGElement>;
            [elemName: string]: any;
        }
    }
}
`;
}

/**
 * Main generation function
 */
async function generate() {
    console.log('🚀 sigx ambient type generator (using dts-bundle-generator)\n');
    console.log('='.repeat(60));
    
    // Clean temp directory
    cleanDir(TEMP_DIR);
    ensureDir(OUTPUT_DIR);
    
    console.log('\n📝 Bundling module types...\n');
    
    // Extract JSX global types first
    const jsxGlobalTypes = extractJsxGlobalTypes();
    
    const bundledTypes: Record<string, string> = {};
    
    for (const config of MODULES) {
        const bundled = bundleModuleTypes(config);
        if (bundled) {
            bundledTypes[config.name] = wrapAsModule(config.name, bundled);
        }
    }
    
    // Build the output file
    const timestamp = new Date().toISOString();
    const allowedModules = MODULES.map(m => m.name);
    
    const output = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
 * 
 * Monaco Editor type definitions for SignalX packages.
 * Generated using dts-bundle-generator from actual source files.
 * 
 * Generated: ${timestamp}
 * 
 * To regenerate: pnpm run generate:types
 */

/** List of modules that can be imported in Live Code */
export const ALLOWED_MODULES = ${JSON.stringify(allowedModules, null, 4)} as const;

export type AllowedModule = typeof ALLOWED_MODULES[number];

/** Module to window global variable mapping */
export const MODULE_GLOBALS: Record<AllowedModule, string> = {
${MODULES.map(m => `    '${m.name}': '${m.globalVar}'`).join(',\n')}
};

/** JSX Runtime types */
export const jsxRuntimeTypes = \`
declare module "sigx/jsx-runtime" {
    export function jsx(type: any, props: any, key?: any): JSX.Element;
    export function jsxs(type: any, props: any, key?: any): JSX.Element;
    export function jsxDEV(type: any, props: any, key?: any): JSX.Element;
    export const Fragment: unique symbol;
}
\`;

/** Ambient JSX types (global namespace) - includes CSSProperties, HTMLAttributes, IntrinsicElements */
export const sigxTypes = \`${escapeTemplate(jsxGlobalTypes)}\`;

/** @deprecated Use sigxTypes instead */
export const jsxAmbientTypes = sigxTypes;

/** sigx module types */
export const sigxModuleTypes = \`${escapeTemplate(bundledTypes['sigx'] || '')}\`;

/** @sigx/router module types */
export const routerModuleTypes = \`${escapeTemplate(bundledTypes['@sigx/router'] || '')}\`;

/** @sigx/store module types */
export const storeModuleTypes = \`${escapeTemplate(bundledTypes['@sigx/store'] || '')}\`;

/** @sigx/daisyui module types */
export const daisyuiModuleTypes = \`${escapeTemplate(bundledTypes['@sigx/daisyui'] || '')}\`;

/** All types combined for Monaco */
export const allModuleTypes = [
    jsxRuntimeTypes,
    sigxTypes,
    sigxModuleTypes,
    routerModuleTypes,
    storeModuleTypes,
    daisyuiModuleTypes
].join('\\n');

/** Module types map for selective registration */
export const moduleTypesMap: Record<string, string> = {
    'sigx/jsx-runtime': jsxRuntimeTypes,
    'sigx': sigxModuleTypes,
    '@sigx/router': routerModuleTypes,
    '@sigx/store': storeModuleTypes,
    '@sigx/daisyui': daisyuiModuleTypes,
};
`;

    writeFileSync(OUTPUT_FILE, output, 'utf-8');
    
    // Cleanup temp directory
    cleanDir(TEMP_DIR);
    rmSync(TEMP_DIR, { recursive: true, force: true });
    
    console.log('\n' + '='.repeat(60));
    console.log(`✅ Generated: ${relative(process.cwd(), OUTPUT_FILE)}`);
    console.log(`   Size: ${(output.length / 1024).toFixed(2)} KB`);
    console.log(`   Modules: ${allowedModules.join(', ')}`);
}

function escapeTemplate(str: string): string {
    return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

generate().catch(console.error);
