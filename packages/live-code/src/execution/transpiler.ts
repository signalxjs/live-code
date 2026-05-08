import { transform } from 'sucrase';
import { ALLOWED_MODULES, MODULE_GLOBALS, type AllowedModule } from '../types/generated-modules';

/** Transpile TSX code to JavaScript */
export function transpileTsx(code: string): string {
    const result = transform(code, {
        transforms: ['typescript', 'jsx'],
        jsxRuntime: 'automatic',
        jsxImportSource: 'sigx',
        production: true,
        disableESTransforms: true,
    });

    return result.code;
}

/**
 * Preprocess code to handle colon-based JSX props like `model:propName`, `onUpdate:propName`, and `use:directive`.
 * Sucrase doesn't support colons in JSX attribute names, so we convert them to a temporary format.
 * 
 * Converts: `model:min={...}` → `__model_min__={...}`
 * Converts: `onUpdate:min={...}` → `__onUpdate_min__={...}`
 * Converts: `use:show={...}` → `__use_show__={...}`
 * 
 * These get converted back after transpilation.
 */
export function preprocessColonProps(code: string): string {
    // Match JSX attributes with colons: model:name, sync:name, onUpdate:name, on:name, use:name, etc.
    // Pattern: word:word followed by = or whitespace (JSX attribute context)
    return code.replace(/\b(model|sync|onUpdate|on|use):(\w+)(\s*=)/g, '__$1_$2__$3');
}

/**
 * Postprocess transpiled code to restore colon-based prop names.
 * 
 * Sucrase outputs object keys as identifiers (no quotes), so we need to:
 * 1. Match identifier keys: `{ __model_min__: value }` → `{ "model:min": value }`
 * 2. Match string keys (fallback): `{ "__model_min__": value }` → `{ "model:min": value }`
 */
export function postprocessColonProps(code: string): string {
    // First, handle identifier keys (most common case from Sucrase)
    // Pattern: __prefix_name__ followed by : (object key context)
    let result = code.replace(/__(model|sync|onUpdate|on|use)_(\w+)__\s*:/g, '"$1:$2":');
    
    // Then handle string keys (fallback for edge cases)
    result = result.replace(/"__(model|sync|onUpdate|on|use)_(\w+)__"/g, '"$1:$2"');
    
    return result;
}

/** 
 * Parse and transform imports to runtime global access.
 * Instead of stripping imports, we transform them to use window globals.
 * 
 * Examples:
 * - `import { signal, Portal } from 'sigx'` → `const { signal, Portal } = window.__SIGX__`
 * - `import * as router from '@sigx/router'` → `const router = window.__SIGX_ROUTER__`
 * - `import { Button } from '@sigx/daisyui'` → `const { Button } = window.__SIGX_DAISYUI__`
 */
export function transformImports(code: string): { transformedImports: string; codeWithoutImports: string } {
    const transformedParts: string[] = [];
    let codeWithoutImports = code;
    
    // Match named imports: import { x, y } from 'module'
    const namedImportRegex = /import\s+(type\s+)?\{\s*([^}]*)\s*\}\s*from\s*['"]([^'"]+)['"];?/g;
    let match;
    
    while ((match = namedImportRegex.exec(code)) !== null) {
        const isTypeOnly = !!match[1];
        let importList = match[2];
        const moduleName = match[3] as AllowedModule;
        
        // Skip type-only imports (they're stripped at runtime anyway)
        if (isTypeOnly) continue;
        
        const globalName = MODULE_GLOBALS[moduleName];
        if (globalName) {
            // Filter out type-only imports and 'render' (we provide our own wrapper)
            // Type-only imports look like: `type Foo` or `type Foo as Bar`
            const filteredImports = importList
                .split(',')
                .map(s => s.trim())
                .filter(s => {
                    // Skip empty
                    if (!s) return false;
                    // Skip type-only imports (e.g., `type Plugin`, `type Foo as Bar`)
                    if (s.startsWith('type ')) return false;
                    // Skip 'render' and 'defineApp' from sigx - we provide our own wrappers
                    if (moduleName === 'sigx' && (s === 'render' || s.startsWith('render ') || s.includes(' as render'))) return false;
                    if (moduleName === 'sigx' && (s === 'defineApp' || s.startsWith('defineApp ') || s.includes(' as defineApp'))) return false;
                    return true;
                })
                .join(', ');
            
            // Skip if no imports left after filtering
            if (!filteredImports.trim()) continue;
            
            // Handle aliases: `import { x as y }` → destructure with rename
            transformedParts.push(`const { ${filteredImports} } = window.${globalName};`);
        } else {
            console.warn(`[Live Code] Unknown module: ${moduleName}. Allowed: ${ALLOWED_MODULES.join(', ')}`);
        }
    }
    
    // Match namespace imports: import * as x from 'module'
    const namespaceImportRegex = /import\s+\*\s+as\s+(\w+)\s+from\s*['"]([^'"]+)['"];?/g;
    
    while ((match = namespaceImportRegex.exec(code)) !== null) {
        const alias = match[1];
        const moduleName = match[2] as AllowedModule;
        
        const globalName = MODULE_GLOBALS[moduleName];
        if (globalName) {
            transformedParts.push(`const ${alias} = window.${globalName};`);
        } else {
            console.warn(`[Live Code] Unknown module: ${moduleName}. Allowed: ${ALLOWED_MODULES.join(', ')}`);
        }
    }
    
    // Match default imports: import x from 'module'
    const defaultImportRegex = /import\s+(\w+)\s+from\s*['"]([^'"]+)['"];?/g;
    
    while ((match = defaultImportRegex.exec(code)) !== null) {
        const importName = match[1];
        const moduleName = match[2] as AllowedModule;
        
        // Skip if already matched by namespace (has * as)
        if (match[0].includes('* as')) continue;
        
        const globalName = MODULE_GLOBALS[moduleName];
        if (globalName) {
            // For default imports, expose the whole module
            transformedParts.push(`const ${importName} = window.${globalName};`);
        } else {
            console.warn(`[Live Code] Unknown module: ${moduleName}. Allowed: ${ALLOWED_MODULES.join(', ')}`);
        }
    }
    
    // Remove all import statements from the code
    codeWithoutImports = codeWithoutImports
        // Named imports
        .replace(/import\s+(type\s+)?\{\s*[^}]*\s*\}\s*from\s*['"][^'"]*['"];?\s*/g, '')
        // Namespace imports
        .replace(/import\s+\*\s+as\s+\w+\s+from\s*['"][^'"]*['"];?\s*/g, '')
        // Default imports
        .replace(/import\s+\w+\s+from\s*['"][^'"]*['"];?\s*/g, '');
    
    return { 
        transformedImports: transformedParts.join('\n'), 
        codeWithoutImports: codeWithoutImports.trim()
    };
}

/** 
 * Generate runtime injection code that provides essential SignalX runtime setup.
 * User imports are now transformed dynamically, so we only need:
 * - JSX runtime helpers (for Sucrase's automatic JSX transform)
 * - Sandbox container reference
 * - Console capture
 * - Wrapper render function for cleanup tracking
 * 
 * @param containerId - The unique ID of the container element for this code block
 */
export function getRuntimeInjection(containerId: string): string {
    return `
// JSX runtime - required for Sucrase's automatic JSX transform
const { jsx, jsxs, jsxDEV, Fragment } = window.__SIGX__;
const _jsx = jsx;
const _jsxs = jsxs;
const _Fragment = Fragment;

// Create sandbox element for render target
const __container__ = document.getElementById('${containerId}');
if (__container__ && !__container__.querySelector('#sandbox')) {
    const sandbox = document.createElement('div');
    sandbox.id = 'sandbox';
    __container__.appendChild(sandbox);
}

// Live code render tracking for cleanup - scoped per containerId
// This prevents cleanup from one code block affecting others
window.__LIVE_CODE_CONTAINERS__ = window.__LIVE_CODE_CONTAINERS__ || {};
window.__LIVE_CODE_CONTAINERS__['${containerId}'] = window.__LIVE_CODE_CONTAINERS__['${containerId}'] || new Set();
const __myContainers__ = window.__LIVE_CODE_CONTAINERS__['${containerId}'];

// Wrapper render function that tracks containers for cleanup
function render(element, container, appContext) {
    // Resolve string selectors to elements
    // IMPORTANT: For "#sandbox", look inside our specific container first
    let resolved;
    if (typeof container === 'string') {
        if (container === '#sandbox' && __container__) {
            // Scope #sandbox lookup to our container
            resolved = __container__.querySelector('#sandbox');
        } else {
            resolved = document.querySelector(container);
        }
    } else {
        resolved = container;
    }
    
    if (resolved) {
        // Track this container for cleanup (scoped to this code block)
        __myContainers__.add(resolved);
    }
    
    // Call the real render with the resolved element (not the original selector)
    return window.__SIGX__.render(element, resolved, appContext);
}

// Wrapper defineApp function that patches mount() to use scoped sandbox resolution
function defineApp(rootComponent) {
    const app = window.__SIGX__.defineApp(rootComponent);
    const originalMount = app.mount.bind(app);
    app.mount = function(target, renderFn) {
        // Resolve '#sandbox' to the scoped container, same as render()
        if (typeof target === 'string' && target === '#sandbox' && __container__) {
            const resolved = __container__.querySelector('#sandbox');
            if (resolved) {
                __myContainers__.add(resolved);
                return originalMount(resolved, renderFn);
            }
        }
        if (typeof target === 'string') {
            const resolved = document.querySelector(target);
            if (resolved) __myContainers__.add(resolved);
            return originalMount(resolved || target, renderFn);
        }
        __myContainers__.add(target);
        return originalMount(target, renderFn);
    };
    return app;
}

// Scoped cleanup function - only unmount containers for THIS code block
window.__LIVE_CODE_CLEANUP_FOR__ = window.__LIVE_CODE_CLEANUP_FOR__ || function(containerId) {
    const containers = window.__LIVE_CODE_CONTAINERS__[containerId];
    if (containers) {
        containers.forEach(container => {
            try {
                // Render null to unmount
                window.__SIGX__.render(null, container);
            } catch (e) {
                // Container may already be removed
            }
        });
        containers.clear();
    }
};

// Legacy global cleanup - for backwards compatibility, but now only cleans THIS block
window.__LIVE_CODE_CLEANUP__ = function() {
    window.__LIVE_CODE_CLEANUP_FOR__('${containerId}');
};

// Console capture - scoped per containerId for multiple instances on same page
const __consoleStore__ = window.__LIVE_CODE_CONSOLE__ = window.__LIVE_CODE_CONSOLE__ || { 
    logs: {},  // Keyed by containerId
    currentContainerId: null,
    originalConsole: null 
};

// Initialize logs array for this container
__consoleStore__.logs['${containerId}'] = [];
__consoleStore__.currentContainerId = '${containerId}';

// Helper to format values for display
function __formatValue__(value, depth = 0) {
    if (depth > 3) return '...';
    
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return '"' + value + '"';
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (typeof value === 'function') return '[Function' + (value.name ? ': ' + value.name : '') + ']';
    if (typeof value === 'symbol') return value.toString();
    
    // Handle signals (objects with .value property that are reactive)
    if (value && typeof value === 'object' && 'value' in value && Object.keys(value).length === 1) {
        return 'Signal { value: ' + __formatValue__(value.value, depth + 1) + ' }';
    }
    
    if (Array.isArray(value)) {
        if (value.length === 0) return '[]';
        if (depth > 2) return '[...]';
        const items = value.slice(0, 10).map(v => __formatValue__(v, depth + 1));
        if (value.length > 10) items.push('... +' + (value.length - 10) + ' more');
        return '[' + items.join(', ') + ']';
    }
    
    if (typeof value === 'object') {
        const keys = Object.keys(value);
        if (keys.length === 0) return '{}';
        if (depth > 2) return '{...}';
        const pairs = keys.slice(0, 8).map(k => k + ': ' + __formatValue__(value[k], depth + 1));
        if (keys.length > 8) pairs.push('... +' + (keys.length - 8) + ' more');
        return '{ ' + pairs.join(', ') + ' }';
    }
    
    return String(value);
}

// Only intercept console methods once (store original methods on first run)
// Use window.console explicitly to avoid conflict with scoped console shadow
if (!__consoleStore__.originalConsole) {
    __consoleStore__.originalConsole = { 
        log: window.console.log.bind(window.console),
        info: window.console.info.bind(window.console),
        warn: window.console.warn.bind(window.console),
        error: window.console.error.bind(window.console)
    };
    
    window.console.log = (...args) => {
        __consoleStore__.originalConsole.log(...args);
        const cid = __consoleStore__.currentContainerId;
        if (cid && __consoleStore__.logs[cid]) {
            __consoleStore__.logs[cid].push({ type: 'log', args: args.map(a => __formatValue__(a)) });
        }
    };
    window.console.info = (...args) => {
        __consoleStore__.originalConsole.info(...args);
        const cid = __consoleStore__.currentContainerId;
        if (cid && __consoleStore__.logs[cid]) {
            __consoleStore__.logs[cid].push({ type: 'info', args: args.map(a => __formatValue__(a)) });
        }
    };
    window.console.warn = (...args) => {
        __consoleStore__.originalConsole.warn(...args);
        const cid = __consoleStore__.currentContainerId;
        if (cid && __consoleStore__.logs[cid]) {
            __consoleStore__.logs[cid].push({ type: 'warn', args: args.map(a => __formatValue__(a)) });
        }
    };
    window.console.error = (...args) => {
        __consoleStore__.originalConsole.error(...args);
        const cid = __consoleStore__.currentContainerId;
        if (cid && __consoleStore__.logs[cid]) {
            __consoleStore__.logs[cid].push({ type: 'error', args: args.map(a => __formatValue__(a)) });
        }
    };
}

// Create scoped console for THIS code block that always logs to the right container
// This is used by effects and async code that run after currentContainerId may have changed
const __scopedConsole__ = {
    log: (...args) => {
        __consoleStore__.originalConsole.log(...args);
        __consoleStore__.logs['${containerId}'].push({ type: 'log', args: args.map(a => __formatValue__(a)) });
    },
    info: (...args) => {
        __consoleStore__.originalConsole.info(...args);
        __consoleStore__.logs['${containerId}'].push({ type: 'info', args: args.map(a => __formatValue__(a)) });
    },
    warn: (...args) => {
        __consoleStore__.originalConsole.warn(...args);
        __consoleStore__.logs['${containerId}'].push({ type: 'warn', args: args.map(a => __formatValue__(a)) });
    },
    error: (...args) => {
        __consoleStore__.originalConsole.error(...args);
        __consoleStore__.logs['${containerId}'].push({ type: 'error', args: args.map(a => __formatValue__(a)) });
    }
};

// Shadow the global console with our scoped version for this code block
// This ensures all console.log calls (including from effects) go to the right container
const console = __scopedConsole__;
`;
}

/** Wrap transpiled code with runtime injection and transformed imports */
export function wrapWithRuntime(transpiledCode: string, containerId: string, transformedImports: string): string {
    return getRuntimeInjection(containerId) + '\n\n' + transformedImports + '\n\n' + transpiledCode;
}

/** 
 * Full transpilation pipeline:
 * 1. Preprocess colon-based props (model:name → __model_name__)
 * 2. Transform user imports to window global access
 * 3. Transpile TSX → JS (Sucrase)
 * 4. Postprocess to restore colon props (__model_name__ → model:name)
 * 5. Strip any remaining imports from transpiled code
 * 6. Wrap with runtime injection + transformed imports
 */
export function prepareCode(tsxCode: string, containerId: string): string {
    // Step 1: Preprocess colon-based props BEFORE anything else
    const preprocessed = preprocessColonProps(tsxCode);
    
    // Step 2: Transform imports BEFORE transpilation (on preprocessed TSX)
    const { transformedImports, codeWithoutImports } = transformImports(preprocessed);
    
    // Step 3: Transpile TSX → JS
    const transpiled = transpileTsx(codeWithoutImports);
    
    // Step 4: Postprocess to restore colon prop names
    const postprocessed = postprocessColonProps(transpiled);
    
    // Step 5: Strip any auto-generated imports from Sucrase (jsx-runtime imports)
    const stripped = postprocessed
        .replace(/import\s*\{[^}]*\}\s*from\s*["'][^"']*["'];?\s*/g, '')
        .replace(/import\s+.*?\s+from\s+['"][^'"]*['"];?\s*/g, '');
    
    // Step 6: Wrap with runtime + user's transformed imports
    const wrapped = wrapWithRuntime(stripped, containerId, transformedImports);
    
    return wrapped;
}
