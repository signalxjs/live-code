/**
 * Live-code's editor entry point.
 *
 * Delegates the heavy lifting to `@sigx/monaco-editor` (loader, JSX/TSX
 * handling, Vite plugin, prebundled assets) and only adds live-code-specific
 * setup: the sigx ambient `.d.ts` blobs, the sigx JSX import source, and the
 * Shiki themes used by the docs site.
 */

import {
    loadMonaco as baseLoadMonaco,
    configureMonaco,
    configureMonacoLoader,
    isMonacoLoaded,
    getMonaco,
    createEditor as baseCreateEditor,
    typescriptLanguagePack,
    type MonacoLoaderConfig,
    type MonacoNamespace,
    type MonacoEditorInstance,
    type CreateEditorOptions
} from '@sigx/monaco-editor';
import { applyShikiThemes } from '@sigx/monaco-editor/shiki';

import {
    sigxTypes,
    jsxRuntimeTypes,
    sigxModuleTypes,
    routerModuleTypes,
    storeModuleTypes,
    daisyuiModuleTypes,
    moduleTypesMap
} from '../types/generated-modules';
import { getRegisteredModuleTypes } from '../runtime';

export const SIGX_DARK_THEME = 'github-dark';
export const SIGX_LIGHT_THEME = 'github-light';

export type MonacoEditor = MonacoEditorInstance;
export type { MonacoLoaderConfig, MonacoNamespace, CreateEditorOptions };

let setupPromise: Promise<MonacoNamespace> | null = null;

function buildExtraLibs() {
    const libs: Array<{ content: string; filePath: string }> = [
        { content: jsxRuntimeTypes, filePath: 'node_modules/sigx/jsx-runtime.d.ts' },
        { content: sigxTypes, filePath: 'sigx.d.ts' },
        { content: sigxModuleTypes, filePath: 'node_modules/sigx/index.d.ts' },
        { content: routerModuleTypes, filePath: 'node_modules/@sigx/router/index.d.ts' },
        { content: storeModuleTypes, filePath: 'node_modules/@sigx/store/index.d.ts' },
        { content: daisyuiModuleTypes, filePath: 'node_modules/@sigx/daisyui/index.d.ts' }
    ];

    for (const [name, content] of Object.entries(getRegisteredModuleTypes())) {
        if (moduleTypesMap[name as keyof typeof moduleTypesMap]) continue;
        libs.push({ content, filePath: `node_modules/${name}/index.d.ts` });
    }

    return libs;
}

/** Load Monaco with sigx-specific languages, ambient types, and Shiki themes. Idempotent. */
export async function loadMonaco(): Promise<MonacoNamespace> {
    if (setupPromise) return setupPromise;

    setupPromise = (async () => {
        configureMonaco({
            languages: [typescriptLanguagePack({ jsxImportSource: 'sigx' })],
            extraLibs: buildExtraLibs()
        });

        const monaco = await baseLoadMonaco();

        await applyShikiThemes(monaco, {
            themes: [
                import('@shikijs/themes/one-dark-pro'),
                import('@shikijs/themes/github-dark'),
                import('@shikijs/themes/github-light'),
                import('@shikijs/themes/vitesse-dark'),
                import('@shikijs/themes/nord')
            ],
            langs: [
                import('@shikijs/langs/typescript'),
                import('@shikijs/langs/tsx'),
                import('@shikijs/langs/javascript'),
                import('@shikijs/langs/jsx'),
                import('@shikijs/langs/html'),
                import('@shikijs/langs/css'),
                import('@shikijs/langs/json')
            ]
        });

        return monaco;
    })();

    return setupPromise;
}

/** Create a Monaco editor with the sigx defaults. Triggers `loadMonaco()` if needed. */
export async function createEditor(options: CreateEditorOptions): Promise<MonacoEditor> {
    await loadMonaco();
    return baseCreateEditor({ theme: SIGX_DARK_THEME, ...options });
}

export { configureMonacoLoader, isMonacoLoaded, getMonaco };
