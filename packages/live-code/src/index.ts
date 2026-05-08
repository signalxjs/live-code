// Components
export { LiveCodeBlock, type LiveCodeBlockProps } from './components';
export { LiveCodeWindow, type LiveCodeWindowProps } from './components';
export { LiveCodeModal, type LiveCodeModalProps } from './components';
export { LivePreview, type LivePreviewProps, type TabType } from './components';

// Client-side initialization (auto-attaches to SSG-rendered code blocks)
export { initLiveCodeBlocks } from './client.js';

// Execution utilities
export {
    runCode,
    executeCode,
    prepareCode,
    transpileTsx,
    transformImports,
    clearPreview,
    formatError,
    type ExecutionResult
} from './execution';

// Editor utilities (lazy-loaded)
export {
    loadMonaco,
    isMonacoLoaded,
    getMonaco,
    createEditor,
    configureMonacoLoader,
    SIGX_DARK_THEME,
    SIGX_LIGHT_THEME,
    type MonacoNamespace,
    type MonacoEditor,
    type MonacoLoaderConfig,
    type CreateEditorOptions
} from './editor';

// Runtime
export {
    initRuntime,
    initRouterRuntime,
    initStoreRuntime,
    initDaisyUIRuntime,
    initAllRuntimes,
    initRegisteredModules,
    isRuntimeInitialized,
    getRuntime,
    configureLiveCode,
    getRegisteredModules,
    getRegisteredModuleTypes,
    type RuntimeConfig,
    type ModuleRegistration
} from './runtime';

export { ALLOWED_MODULES, MODULE_GLOBALS, type AllowedModule } from './types/generated-modules';
