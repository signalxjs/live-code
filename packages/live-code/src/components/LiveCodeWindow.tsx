import { component, signal, render, type Define } from 'sigx';
import { LiveCodeModal } from './LiveCodeModal';
import { initAllRuntimes, isRuntimeInitialized } from '../runtime';

export type LiveCodeWindowProps = 
    & Define.Prop<'code', string>
    & Define.Prop<'filename', string, false>
    & Define.Prop<'language', string, false>
    & Define.Slot<'default'>;

// Counter for unique modal roots
let modalCounter = 0;

/**
 * LiveCodeWindow - Code block with "Try Live" button
 * 
 * Wraps existing code display (Shiki-highlighted via slot) and adds
 * a button that opens a full-screen playground modal.
 * 
 * Usage in MDX:
 * ```mdx
 * <LiveCodeWindow code={`const x = 1;`} filename="example.tsx">
 * 
 * ```tsx
 * const x = 1;
 * ```
 * 
 * </LiveCodeWindow>
 * ```
 */
export const LiveCodeWindow = component<LiveCodeWindowProps>(({ props, slots }) => {
    let modalRoot: HTMLDivElement | null = null;
    
    function openPlayground() {
        // Ensure runtime is initialized before opening
        if (!isRuntimeInitialized()) {
            initAllRuntimes();
        }
        
        // Create modal container
        modalRoot = document.createElement('div');
        modalRoot.id = `live-code-window-modal-${++modalCounter}`;
        document.body.appendChild(modalRoot);
        
        const handleClose = () => {
            if (modalRoot) {
                modalRoot.remove();
                modalRoot = null;
            }
        };
        
        render(
            <LiveCodeModal
                code={props.code}
                language={props.language ?? 'tsx'}
                filename={props.filename}
                onClose={handleClose}
            />,
            modalRoot
        );
    }
    
    return () => {
        const lang = props.language ?? 'tsx';
        const filename = props.filename;
        
        return (
            <div class="live-code-window">
                {/* Window header with traffic lights */}
                <div class="live-code-window-header">
                    <div class="live-code-window-left">
                        <div class="live-code-window-dots">
                            <span class="dot dot-red" />
                            <span class="dot dot-yellow" />
                            <span class="dot dot-green" />
                        </div>
                        {filename && <span class="live-code-window-filename">{filename}</span>}
                        {!filename && <span class="live-code-window-lang">{lang.toUpperCase()}</span>}
                    </div>
                    <button 
                        class="live-code-try-btn"
                        onClick={openPlayground}
                        title="Open in Live Playground"
                    >
                        ⚡ Try Live
                    </button>
                </div>
                
                {/* Code content - use slot for Shiki highlighted content */}
                <div class="live-code-window-content">
                    {slots.default?.()}
                </div>
            </div>
        );
    };
});
