import { prepareCode } from './transpiler';

/** Result of code execution */
export interface ExecutionResult {
    success: boolean;
    error?: string;
    hasRenderOutput?: boolean;
    hasConsoleOutput?: boolean;
}

/** Console output entry */
export interface ConsoleEntry {
    type: 'log' | 'info' | 'warn' | 'error';
    args: string[];
}

/** Global console output storage - scoped per containerId */
declare global {
    interface Window {
        __LIVE_CODE_CONSOLE__?: {
            logs: Record<string, ConsoleEntry[]>;  // Keyed by containerId
            currentContainerId: string | null;
            originalConsole: {
                log: typeof console.log;
                info: typeof console.info;
                warn: typeof console.warn;
                error: typeof console.error;
            } | null;
        };
    }
}

/** Execute prepared code in a sandboxed context */
export async function executeCode(preparedCode: string): Promise<void> {
    const blob = new Blob([preparedCode], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    
    try {
        await import(/* @vite-ignore */ url);
    } finally {
        URL.revokeObjectURL(url);
    }
}

/** Clear console logs for a specific container */
export function clearConsole(containerId?: string): void {
    if (window.__LIVE_CODE_CONSOLE__) {
        if (containerId) {
            window.__LIVE_CODE_CONSOLE__.logs[containerId] = [];
        } else {
            // Clear all logs (legacy behavior)
            window.__LIVE_CODE_CONSOLE__.logs = {};
        }
    }
}

/** Get console logs for a specific container */
export function getConsoleLogs(containerId?: string): ConsoleEntry[] {
    if (!window.__LIVE_CODE_CONSOLE__) return [];
    if (containerId) {
        return window.__LIVE_CODE_CONSOLE__.logs[containerId] ?? [];
    }
    // Legacy: return current container logs
    const currentId = window.__LIVE_CODE_CONSOLE__.currentContainerId;
    return currentId ? (window.__LIVE_CODE_CONSOLE__.logs[currentId] ?? []) : [];
}

/** Check if container has rendered content */
export function hasRenderedContent(containerId: string): boolean {
    const container = document.getElementById(containerId);
    return container ? container.children.length > 0 : false;
}

/** Format error for display */
export function formatError(err: unknown): string {
    if (err instanceof Error) {
        let message = err.message;
        // Add location if available (Sucrase errors)
        const locError = err as Error & { loc?: { line: number; column: number } };
        if (locError.loc) {
            message = `Line ${locError.loc.line}, Column ${locError.loc.column}: ${message}`;
        }
        return message;
    }
    return String(err);
}

/** Clear the preview container */
export function clearPreview(container: HTMLElement | null): void {
    if (container) {
        container.innerHTML = '';
    }
}

/** 
 * Run code in a live code block
 * @param tsxCode - The TSX source code to execute
 * @param containerId - The unique ID of the container element
 */
export async function runCode(
    tsxCode: string,
    containerId: string
): Promise<ExecutionResult> {
    try {
        const container = document.getElementById(containerId);
        
        // Clear previous render and console for this container
        clearPreview(container);
        clearConsole(containerId);
        
        // Prepare and execute code
        const preparedCode = prepareCode(tsxCode, containerId);
        await executeCode(preparedCode);
        
        // Check what we have after execution
        const hasRender = hasRenderedContent(containerId);
        const consoleLogs = getConsoleLogs(containerId);
        
        return { 
            success: true,
            hasRenderOutput: hasRender,
            hasConsoleOutput: consoleLogs.length > 0
        };
    } catch (err) {
        return { 
            success: false, 
            error: formatError(err) 
        };
    }
}
