/**
 * Modal styles for LiveCodeModal
 * Extracted to avoid circular dependencies
 */

// Inject styles for the modal
export function injectStyles() {
    if (document.getElementById('live-code-modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'live-code-modal-styles';
    style.textContent = `
        .lc-modal-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: lc-fade-in 0.15s ease-out;
        }
        
        .lc-modal-container {
            background: #1e1e2e;
            border-radius: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            box-shadow: none;
            border: none;
            animation: lc-fade-in 0.15s ease-out;
        }
        
        .lc-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 16px;
            border-bottom: 1px solid #313244;
            background: #181825;
        }
        
        .lc-modal-title {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            color: #cdd6f4;
        }
        
        .lc-modal-title-icon {
            font-size: 1.25rem;
        }
        
        .lc-modal-title-text {
            font-size: 0.95rem;
        }
        
        .lc-modal-filename {
            color: #6c7086;
            font-size: 0.875rem;
            font-family: ui-monospace, monospace;
        }
        
        .lc-modal-close {
            background: transparent;
            border: 1px solid #45475a;
            border-radius: 6px;
            color: #cdd6f4;
            cursor: pointer;
            padding: 6px 12px;
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.15s ease;
        }
        
        .lc-modal-close:hover {
            background: #45475a;
            border-color: #585b70;
        }
        
        .lc-modal-body {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        
        .lc-modal-toolbar {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background: #11111b;
            border-bottom: 1px solid #313244;
        }
        
        .lc-btn {
            padding: 6px 14px;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            border: none;
            transition: all 0.15s;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .lc-btn-primary {
            background: #89b4fa;
            color: #1e1e2e;
        }
        
        .lc-btn-primary:hover:not(:disabled) {
            background: #b4befe;
        }
        
        .lc-btn-primary:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .lc-btn-ghost {
            background: transparent;
            color: #cdd6f4;
            border: 1px solid #313244;
        }
        
        .lc-btn-ghost:hover {
            background: #313244;
        }
        
        .lc-toolbar-spacer {
            flex: 1;
        }
        
        .lc-toolbar-hint {
            color: #6c7086;
            font-size: 0.75rem;
        }
        
        .lc-modal-content {
            flex: 1;
            display: flex;
            min-height: 0;
        }
        
        .lc-pane {
            display: flex;
            flex-direction: column;
            min-height: 0;
        }
        
        .lc-pane-editor {
            width: 50%;
            border-right: 1px solid #313244;
        }
        
        .lc-pane-preview {
            width: 50%;
            background: #1e1e2e;
        }
        
        .lc-pane-header {
            padding: 8px 12px;
            background: #181825;
            font-size: 0.75rem;
            font-weight: 500;
            color: #6c7086;
            border-bottom: 1px solid #313244;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .lc-pane-body {
            flex: 1;
            overflow: auto;
            min-height: 0;
        }
        
        .lc-editor-container {
            height: 100%;
        }
        
        .lc-preview-container {
            padding: 16px;
            min-height: 100px;
        }
        
        .lc-error-badge {
            background: #f38ba8;
            color: #1e1e2e;
            padding: 2px 8px;
            border-radius: 9999px;
            font-size: 0.625rem;
            font-weight: 600;
        }
        
        .lc-error-alert {
            background: rgba(243, 139, 168, 0.15);
            border: 1px solid #f38ba8;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 16px;
            display: flex;
            gap: 10px;
            align-items: flex-start;
        }
        
        .lc-error-alert pre {
            margin: 0;
            font-size: 0.75rem;
            white-space: pre-wrap;
            font-family: ui-monospace, monospace;
            color: #f38ba8;
        }
        
        /* Tabs for Preview/Console */
        .lc-tabs {
            display: flex;
            gap: 0;
            background: #181825;
            border-bottom: 1px solid #313244;
        }
        
        .lc-tab {
            padding: 8px 16px;
            font-size: 0.75rem;
            font-weight: 500;
            color: #6c7086;
            background: transparent;
            border: none;
            cursor: pointer;
            transition: all 0.15s;
            border-bottom: 2px solid transparent;
            margin-bottom: -1px;
        }
        
        .lc-tab:hover {
            color: #cdd6f4;
            background: rgba(255, 255, 255, 0.03);
        }
        
        .lc-tab.active {
            color: #89b4fa;
            border-bottom-color: #89b4fa;
        }
        
        .lc-tab-badge {
            margin-left: 6px;
            padding: 1px 6px;
            font-size: 0.625rem;
            background: #313244;
            border-radius: 9999px;
            color: #a6adc8;
        }
        
        .lc-tab.active .lc-tab-badge {
            background: rgba(137, 180, 250, 0.2);
            color: #89b4fa;
        }
        
        .lc-tab-content {
            display: none;
            flex: 1;
            overflow: auto;
            min-height: 0;
        }
        
        .lc-tab-content.active {
            display: block;
        }
        
        /* Console styles */
        .lc-console {
            font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
            font-size: 13px;
            padding: 12px;
        }
        
        .lc-console-empty {
            color: #6c7086;
            font-style: italic;
            padding: 16px;
        }
        
        .lc-console-line {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            padding: 4px 0;
        }
        
        .lc-console-icon {
            flex-shrink: 0;
            width: 16px;
            text-align: center;
            color: #6c7086;
        }
        
        .lc-console-text {
            flex: 1;
            white-space: pre-wrap;
            word-break: break-word;
            color: #cdd6f4;
        }
        
        .lc-console-log .lc-console-icon { color: #89b4fa; }
        .lc-console-info .lc-console-icon { color: #89dceb; }
        .lc-console-info .lc-console-text { color: #89dceb; }
        .lc-console-warn .lc-console-icon { color: #f9e2af; }
        .lc-console-warn .lc-console-text { color: #f9e2af; }
        .lc-console-error .lc-console-icon { color: #f38ba8; }
        .lc-console-error .lc-console-text { color: #f38ba8; }
        
        @keyframes lc-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes lc-scale-in {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}
