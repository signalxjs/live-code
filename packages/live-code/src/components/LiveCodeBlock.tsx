import { component, signal, onMounted, onUnmounted } from 'sigx';
import { runCode, type ExecutionResult } from '../execution';
import { createEditor, type MonacoEditor, SIGX_DARK_THEME } from '../editor';
import { initAllRuntimes, isRuntimeInitialized } from '../runtime';

// Counter for generating unique container IDs
let instanceCounter = 0;

/** Props for LiveCodeBlock component */
export interface LiveCodeBlockProps {
    /** The source code to display and execute */
    code: string;
    /** Programming language (default: 'tsx') */
    language?: string;
    /** Optional filename to display */
    filename?: string;
    /** Whether to auto-run on mount (default: false) */
    autoRun?: boolean;
    /** Height of the preview area (default: 'auto') */
    previewHeight?: string;
    /** Height of the editor when open (default: '300px') */
    editorHeight?: string;
    /** Theme for editor (default: 'sigx-dark') */
    theme?: string;
    /** Show line numbers in static view (default: true) */
    showLineNumbers?: boolean;
}

/**
 * LiveCodeBlock - Interactive code block component for documentation
 * 
 * Features:
 * - Static code display with syntax highlighting (use slot for SSG Shiki content)
 * - "Run" button to execute code in the preview area
 * - "Edit" button to open Monaco editor (lazy-loaded)
 * - "Reset" button to restore original code
 * - "Copy" button to copy code to clipboard
 * - Auto-injects container reference for render() calls
 */
export const LiveCodeBlock = component<LiveCodeBlockProps>(({ props, slots }) => {
    // Generate unique ID for this instance
    const containerId = `sigx-live-${++instanceCounter}`;
    
    // State
    const isEditing = signal(false);
    const currentCode = signal(props.code);
    const error = signal<string | null>(null);
    const isRunning = signal(false);
    const hasRun = signal(false);
    
    // Editor reference
    let editorInstance: MonacoEditor | null = null;
    let editorContainer: HTMLElement | null = null;
    
    // Ensure runtime is initialized
    onMounted(() => {
        if (!isRuntimeInitialized()) {
            initAllRuntimes();
        }
        
        // Auto-run if enabled
        if (props.autoRun) {
            handleRun();
        }
    });
    
    // Cleanup editor on unmount
    onUnmounted(() => {
        if (editorInstance) {
            editorInstance.dispose();
            editorInstance = null;
        }
    });
    
    /** Run the current code */
    async function handleRun() {
        if (isRunning.value) return;
        
        isRunning.value = true;
        error.value = null;
        
        // Show preview container first, then wait for DOM update before executing
        hasRun.value = true;
        
        // Wait for the preview container to be rendered in the DOM
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        try {
            const result: ExecutionResult = await runCode(currentCode.value, containerId);
            
            if (!result.success && result.error) {
                error.value = result.error;
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : String(err);
        } finally {
            isRunning.value = false;
        }
    }
    
    /** Toggle editor mode */
    async function handleEdit() {
        if (isEditing.value) {
            // Save code from editor and close
            if (editorInstance) {
                currentCode.value = editorInstance.getValue();
            }
            isEditing.value = false;
        } else {
            // Open editor
            isEditing.value = true;
            
            // Wait for DOM update, then create editor
            requestAnimationFrame(async () => {
                if (editorContainer && !editorInstance) {
                    try {
                        editorInstance = await createEditor({
                            container: editorContainer,
                            value: currentCode.value,
                            // Pass 'tsx' to enable JSX support - the loader uses .tsx extension
                            language: props.language ?? 'tsx',
                            theme: props.theme ?? SIGX_DARK_THEME,
                            minimap: false,
                            fontSize: 14,
                        });
                    } catch (err) {
                        console.error('Failed to load Monaco editor:', err);
                        error.value = 'Failed to load editor';
                        isEditing.value = false;
                    }
                }
            });
        }
    }
    
    /** Reset code to original */
    function handleReset() {
        currentCode.value = props.code;
        error.value = null;
        hasRun.value = false;
        
        if (editorInstance) {
            editorInstance.setValue(props.code);
        }
        
        // Clear preview
        const previewEl = document.getElementById(containerId);
        if (previewEl) {
            previewEl.innerHTML = '';
        }
    }
    
    /** Copy code to clipboard */
    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(currentCode.value);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }
    
    return () => {
        const lang = props.language ?? 'tsx';
        const filename = props.filename;
        const previewHeight = props.previewHeight ?? 'auto';
        const editorHeightValue = props.editorHeight ?? '300px';
        
        return (
            <div class="live-code-block">
                {/* Header */}
                <div class="live-code-header">
                    <div class="live-code-header-left">
                        <div class="live-code-dots">
                            <span class="dot dot-red" />
                            <span class="dot dot-yellow" />
                            <span class="dot dot-green" />
                        </div>
                        {filename && <span class="live-code-filename">{filename}</span>}
                        {!filename && <span class="live-code-lang">{lang.toUpperCase()}</span>}
                    </div>
                    <div class="live-code-actions">
                        <button 
                            class="live-code-btn live-code-btn-run"
                            onClick={handleRun}
                            disabled={isRunning.value}
                            title="Run code"
                        >
                            {isRunning.value ? '⏳' : '▶'} Run
                        </button>
                        <button 
                            class="live-code-btn live-code-btn-edit"
                            onClick={handleEdit}
                            title={isEditing.value ? 'Close editor' : 'Edit code'}
                        >
                            {isEditing.value ? '✓ Done' : '✏ Edit'}
                        </button>
                        <button 
                            class="live-code-btn"
                            onClick={handleReset}
                            title="Reset to original"
                        >
                            ↺
                        </button>
                        <button 
                            class="live-code-btn"
                            onClick={handleCopy}
                            title="Copy code"
                        >
                            📋
                        </button>
                    </div>
                </div>
                
                {/* Code Display / Editor */}
                <div class="live-code-content">
                    {isEditing.value ? (
                        <div 
                            class="live-code-editor"
                            style={{ height: editorHeightValue }}
                            ref={(el: HTMLElement) => { editorContainer = el; }}
                        />
                    ) : (
                        <div class="live-code-static">
                            {/* Use slot for SSG Shiki content, fallback to raw code */}
                            {slots.default?.() ?? (
                                <pre class="live-code-pre">
                                    <code>{currentCode.value}</code>
                                </pre>
                            )}
                        </div>
                    )}
                </div>
                
                {/* Error Display */}
                {error.value && (
                    <div class="live-code-error">
                        <span class="live-code-error-icon">⚠️</span>
                        <span class="live-code-error-text">{error.value}</span>
                    </div>
                )}
                
                {/* Preview Area */}
                {hasRun.value && (
                    <div class="live-code-preview-wrapper">
                        <div class="live-code-preview-label">Preview</div>
                        <div 
                            id={containerId}
                            class="live-code-preview code-window-preview-container"
                            style={{ minHeight: previewHeight }}
                        />
                    </div>
                )}
            </div>
        );
    };
});
