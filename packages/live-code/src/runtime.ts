import * as sigx from 'sigx';
import { MODULE_GLOBALS, type AllowedModule } from './types/generated-modules';

/** Module registration with optional ambient types for Monaco IntelliSense. */
export interface ModuleRegistration {
    /** Function that returns or loads the module exports. */
    loader: () => Promise<unknown> | unknown;
    /** Optional ambient `.d.ts` blob for the editor. */
    types?: string;
    /** Window global to expose the module under (auto-derived if omitted). */
    globalVar?: string;
}

/** Runtime configuration for live code execution. */
export type RuntimeConfig = {
    /** Additional modules to make available inside live code blocks. */
    modules?: Record<string, ModuleRegistration | (() => Promise<unknown> | unknown)>;
    /** Auto-initialize all built-in runtimes (router, store, daisyui). */
    autoInitAll?: boolean;
};

const registeredModules: Record<string, ModuleRegistration> = {};
let runtimeConfig: RuntimeConfig = {};

/**
 * Configure the live code runtime with additional modules. Call this before
 * any live code blocks are mounted.
 *
 * @example
 * import { configureLiveCode } from '@sigx/live-code';
 * import * as daisyui from '@sigx/daisyui';
 *
 * configureLiveCode({
 *     modules: {
 *         '@sigx/daisyui': () => daisyui
 *     }
 * });
 */
export function configureLiveCode(config: RuntimeConfig): void {
    runtimeConfig = { ...runtimeConfig, ...config };

    if (config.modules) {
        for (const [name, registration] of Object.entries(config.modules)) {
            registeredModules[name] = typeof registration === 'function'
                ? { loader: registration }
                : registration;
        }
    }
}

export function getRegisteredModules(): Record<string, ModuleRegistration> {
    return registeredModules;
}

export function getRegisteredModuleTypes(): Record<string, string> {
    const types: Record<string, string> = {};
    for (const [name, registration] of Object.entries(registeredModules)) {
        if (registration.types) types[name] = registration.types;
    }
    return types;
}

/** Expose sigx on `window.__SIGX__` so transpiled code can resolve imports. */
export function initRuntime(): void {
    if (typeof window !== 'undefined') {
        (window as any).__SIGX__ = sigx;
    }
}

export async function initRouterRuntime(): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
        const router = await import(/* @vite-ignore */ '@sigx/router' as string);
        (window as any).__SIGX_ROUTER__ = router;
    } catch {
        // Optional peer — silently skip if not installed.
    }
}

export async function initStoreRuntime(): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
        const store = await import(/* @vite-ignore */ '@sigx/store' as string);
        (window as any).__SIGX_STORE__ = store;
    } catch {
        // Optional peer — silently skip if not installed.
    }
}

export async function initDaisyUIRuntime(): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
        const daisyui = await import(/* @vite-ignore */ '@sigx/daisyui' as string);
        (window as any).__SIGX_DAISYUI__ = daisyui;
    } catch {
        // Optional peer — silently skip if not installed.
    }
}

export async function initAllRuntimes(): Promise<void> {
    initRuntime();
    await Promise.allSettled([
        initRouterRuntime(),
        initStoreRuntime(),
        initDaisyUIRuntime(),
        initRegisteredModules()
    ]);
}

export async function initRegisteredModules(): Promise<void> {
    if (typeof window === 'undefined') return;

    for (const [name, registration] of Object.entries(registeredModules)) {
        try {
            const moduleExports = await registration.loader();
            const windowKey = registration.globalVar ?? (
                MODULE_GLOBALS[name as AllowedModule]
                ?? name.replace('@sigx/', '__SIGX_').replace(/-/g, '_').toUpperCase() + '__'
            );
            (window as any)[windowKey] = moduleExports;
        } catch (e) {
            console.warn(`[live-code] Failed to initialize module: ${name}`, e);
        }
    }
}

export function isRuntimeInitialized(): boolean {
    return typeof window !== 'undefined' && (window as any).__SIGX__ !== undefined;
}

export function getRuntime(): typeof sigx {
    if (!isRuntimeInitialized()) {
        throw new Error('SignalX runtime not initialized. Call initRuntime() first.');
    }
    return (window as any).__SIGX__;
}

