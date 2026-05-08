/**
 * LiveCodeModal - Full-screen modal with Monaco editor and live preview
 * 
 * Features:
 * - Split view: Monaco editor (left) + Preview/Console (right)
 * - Auto-run on code changes (debounced)
 * - Console tab for capturing console.log output
 * - No external UI dependencies (uses custom CSS)
 */

import { component, onMounted, onUnmounted, type Define } from 'sigx';
import { runCode, clearPreview, getConsoleLogs, type ExecutionResult } from '../execution';
import { createEditor, type MonacoEditor, SIGX_DARK_THEME } from '../editor';
import { initAllRuntimes, isRuntimeInitialized } from '../runtime';

// Counter for generating unique container IDs
let instanceCounter = 0;

/** Props for LiveCodeModal component */
export type LiveCodeModalProps = 
    & Define.Prop<'code', string>
    & Define.Prop<'language', string, false>
    & Define.Prop<'filename', string, false>
    & Define.Event<'close', void>;

/**
 * LiveCodeModal - Standalone modal for live code playground
 * 
 * Usage:
 * ```tsx
 * // Mount when needed, unmount to close
 * const modalRoot = document.createElement('div');
 * document.body.appendChild(modalRoot);
 * render(<LiveCodeModal code={code} onClose={() => modalRoot.remove()} />, modalRoot);
 * ```
 */
export const LiveCodeModal = component<LiveCodeModalProps>(({ props, emit, signal }) => {
    // Generate unique ID for this instance
    const containerId = `sigx-playground-${++instanceCounter}`;
    
    // State - using component's signal function for reactive proxy
    const state = signal({
        currentCode: props.code ?? '',
        error: null as string | null,
        isRunning: false,
        editorReady: false,
        activeTab: 'preview' as 'preview' | 'console',
        consoleLogs: [] as Array<{ type: string; args: string[] }>,
        hasRenderOutput: false,
    });
    
    // Editor reference
    let editorInstance: MonacoEditor | null = null;
    let runDebounceTimer: number | null = null;
    let consolePollingInterval: ReturnType<typeof setInterval> | null = null;
    
    // Ensure runtime is initialized
    onMounted(() => {
        if (!isRuntimeInitialized()) {
            initAllRuntimes();
        }
        // Add keyboard listener
        document.addEventListener('keydown', handleKeyDown);
        
        // Start polling for console updates (effects may log after initial execution)
        consolePollingInterval = setInterval(() => {
            const currentLogs = getConsoleLogs(containerId);
            if (currentLogs.length !== state.consoleLogs.length) {
                state.consoleLogs = currentLogs.map(log => ({ ...log }));
            }
        }, 100);
    });
    
    // Cleanup on unmount
    onUnmounted(() => {
        // Stop console polling
        if (consolePollingInterval) {
            clearInterval(consolePollingInterval);
            consolePollingInterval = null;
        }
        // Cleanup live code containers (Portal targets, etc.)
        if (typeof (window as any).__LIVE_CODE_CLEANUP__ === 'function') {
            (window as any).__LIVE_CODE_CLEANUP__();
        }
        // Cleanup editor
        if (runDebounceTimer) {
            clearTimeout(runDebounceTimer);
        }
        if (editorInstance) {
            editorInstance.dispose();
            editorInstance = null;
        }
        document.removeEventListener('keydown', handleKeyDown);
    });
    
    /** Close the modal */
    function closeModal() {
        emit('close');
    }
    
    /** Initialize Monaco editor */
    async function initEditor(container: HTMLElement) {
        if (editorInstance || !container) return;
        
        try {
            editorInstance = await createEditor({
                container,
                value: state.currentCode,
                language: props.language ?? 'tsx',
                theme: SIGX_DARK_THEME,
                minimap: false,
                fontSize: 14,
                onChange: (newCode) => {
                    state.currentCode = newCode;
                    // Debounced auto-run
                    if (runDebounceTimer) {
                        clearTimeout(runDebounceTimer);
                    }
                    runDebounceTimer = window.setTimeout(() => {
                        handleRun();
                    }, 500);
                },
            });
            state.editorReady = true;
            
            // Auto-run on editor ready
            await handleRun();
        } catch (err) {
            console.error('Failed to load Monaco editor:', err);
            state.error = 'Failed to load editor';
        }
    }
    
    /** Run the current code */
    async function handleRun() {
        if (state.isRunning) return;
        
        state.isRunning = true;
        state.error = null;
        
        if (editorInstance) {
            state.currentCode = editorInstance.getValue();
        }
        
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        // Ensure runtimes are initialized before running
        if (!isRuntimeInitialized()) {
            await initAllRuntimes();
        }
        
        try {
            const result: ExecutionResult = await runCode(state.currentCode, containerId);
            
            state.consoleLogs = getConsoleLogs(containerId).map(log => ({ ...log }));
            state.hasRenderOutput = result.hasRenderOutput ?? false;
            
            if (!result.success && result.error) {
                state.error = result.error;
            }
            
            // Auto-switch to console tab if no render output but has console output
            if (!result.hasRenderOutput && result.hasConsoleOutput) {
                state.activeTab = 'console';
            } else if (result.hasRenderOutput) {
                state.activeTab = 'preview';
            }
        } catch (err) {
            state.error = err instanceof Error ? err.message : String(err);
        } finally {
            state.isRunning = false;
        }
    }
    
    /** Reset code to original */
    function handleReset() {
        const originalCode = props.code ?? '';
        state.currentCode = originalCode;
        state.error = null;
        state.consoleLogs = [];
        
        if (editorInstance) {
            editorInstance.setValue(originalCode);
        }
        
        const previewEl = document.getElementById(containerId);
        clearPreview(previewEl);
        
        // Re-run after reset
        handleRun();
    }
    
    /** Handle keyboard shortcuts */
    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            closeModal();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            handleRun();
        }
    }
    
    /** Handle backdrop click */
    function handleBackdropClick(e: MouseEvent) {
        if ((e.target as Element).classList.contains('lc-modal-backdrop')) {
            closeModal();
        }
    }
    
    /** Set active tab */
    function setActiveTab(tab: 'preview' | 'console') {
        state.activeTab = tab;
    }
    
    /** Get console icon based on log type */
    function getConsoleIcon(type: string): string {
        switch (type) {
            case 'error': return '✕';
            case 'warn': return '⚠';
            case 'info': return 'ℹ';
            default: return '›';
        }
    }
    
    return () => {
        const filename = props.filename ?? 'Example.tsx';
        
        return (
            <div class="lc-modal-backdrop" onClick={handleBackdropClick}>
                <div class="lc-modal-container">
                    {/* Header */}
                    <div class="lc-modal-header">
                        <div class="lc-modal-title">
                            <span class="lc-modal-title-icon">⚡</span>
                            <span>Live Playground</span>
                            {filename && <span class="lc-modal-filename">{filename}</span>}
                        </div>
                        <button class="lc-modal-close" onClick={closeModal}>×</button>
                    </div>
                    
                    {/* Toolbar */}
                    <div class="lc-modal-toolbar">
                        <button 
                            class="lc-btn lc-btn-primary"
                            onClick={handleRun}
                            disabled={state.isRunning || !state.editorReady}
                        >
                            {state.isRunning ? '⏳ Running...' : '▶ Run'}
                        </button>
                        <button class="lc-btn lc-btn-ghost" onClick={handleReset}>
                            ↺ Reset
                        </button>
                        <div class="lc-toolbar-spacer" />
                        <span class="lc-toolbar-hint">Ctrl+Enter to run • Esc to close</span>
                    </div>
                    
                    {/* Content */}
                    <div class="lc-modal-content">
                        {/* Editor Pane */}
                        <div class="lc-pane lc-pane-editor">
                            <div class="lc-pane-header">Editor</div>
                            <div class="lc-pane-body">
                                <div 
                                    class="lc-editor-container"
                                    ref={(el: HTMLElement) => {
                                        if (el && !editorInstance) {
                                            initEditor(el);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        
                        {/* Preview Pane with Tabs */}
                        <div class="lc-pane lc-pane-preview">
                            {/* Tabs */}
                            <div class="lc-tabs">
                                <button 
                                    class={`lc-tab ${state.activeTab === 'preview' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('preview')}
                                >
                                    Preview
                                    {state.error && <span class="lc-error-badge" style="margin-left: 6px;">Error</span>}
                                </button>
                                <button 
                                    class={`lc-tab ${state.activeTab === 'console' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('console')}
                                >
                                    Console
                                    {state.consoleLogs.length > 0 && (
                                        <span class="lc-tab-badge">{state.consoleLogs.length}</span>
                                    )}
                                </button>
                            </div>
                            
                            {/* Preview Tab Content */}
                            <div class={`lc-tab-content ${state.activeTab === 'preview' ? 'active' : ''}`}>
                                <div class="lc-preview-container code-window-preview-container">
                                    {state.error && (
                                        <div class="lc-error-alert">
                                            <span>⚠️</span>
                                            <pre>{state.error}</pre>
                                        </div>
                                    )}
                                    <div id={containerId} />
                                </div>
                            </div>
                            
                            {/* Console Tab Content */}
                            <div class={`lc-tab-content ${state.activeTab === 'console' ? 'active' : ''}`}>
                                <div class="lc-console">
                                    {state.consoleLogs.length === 0 ? (
                                        <div class="lc-console-empty">No console output</div>
                                    ) : (
                                        state.consoleLogs.map((log: { type: string; args: string[] }) => (
                                            <div class={`lc-console-line lc-console-${log.type}`}>
                                                <span class="lc-console-icon">{getConsoleIcon(log.type)}</span>
                                                <span class="lc-console-text">{log.args.join(' ')}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
});
