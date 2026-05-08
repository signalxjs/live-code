/**
 * Client-side initialization for live code blocks.
 *
 * Attaches click handlers to "Try Live" buttons rendered by the SSG Shiki
 * transformer (opens `LiveCodeModal` with Monaco) and hydrates `LivePreview`
 * islands for inline component previews.
 */

import { render } from 'sigx';
import { LiveCodeModal } from './components/LiveCodeModal';
import { LivePreview } from './components/LivePreview';
import { initAllRuntimes, isRuntimeInitialized } from './runtime';
import { injectStyles } from './utils/modal-styles';

export { injectStyles } from './utils/modal-styles';

let clickHandlerInitialized = false;
const hydratedIslands = new WeakSet<Element>();
let modalCounter = 0;

function decodeBase64(str: string): string {
    try {
        return decodeURIComponent(escape(atob(str)));
    } catch {
        return atob(str);
    }
}

function openPlaygroundModal(code: string, language: string, filename: string) {
    injectStyles();

    const modalRoot = document.createElement('div');
    modalRoot.id = `playground-modal-root-${++modalCounter}`;
    document.body.appendChild(modalRoot);

    const handleClose = () => {
        // Unmount first to fire onUnmounted hooks before removing the host element.
        render(null as any, modalRoot);
        modalRoot.remove();
    };

    render(
        <LiveCodeModal
            code={code}
            language={language}
            filename={filename}
            onClose={handleClose}
        />,
        modalRoot
    );
}

/** Hydrate `LivePreview` islands using IntersectionObserver (`client:visible`). */
function hydrateLivePreviewIslands() {
    const islands = document.querySelectorAll('.live-preview-island[data-island="LivePreview"]');
    const unhydratedIslands = Array.from(islands).filter(island => !hydratedIslands.has(island));
    if (unhydratedIslands.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const island = entry.target as HTMLElement;
                observer.unobserve(island);
                hydrateIsland(island);
            }
        }
    }, {
        rootMargin: '50px',
        threshold: 0.01
    });

    for (const island of unhydratedIslands) observer.observe(island);
}

function hydrateIsland(island: HTMLElement) {
    if (hydratedIslands.has(island)) return;

    try {
        const propsJson = island.getAttribute('data-island-props');
        if (!propsJson) {
            console.error('[live-code] No props found for LivePreview island');
            return;
        }

        const props = JSON.parse(propsJson);

        // Mark hydrated *before* clearing content to prevent double hydration.
        hydratedIslands.add(island);
        island.innerHTML = '';

        render(
            <LivePreview
                code={props.code}
                highlightedCode={props.highlightedCode}
                language={props.language}
                filename={props.filename}
                tabs={props.tabs}
                live={props.live}
            />,
            island
        );
    } catch (err) {
        console.error('[live-code] Failed to hydrate LivePreview island:', err);
    }
}

/** Initialize live code block handlers. Safe to call multiple times (HMR-friendly). */
export function initLiveCodeBlocks() {
    if (!clickHandlerInitialized) {
        clickHandlerInitialized = true;

        document.addEventListener('click', (e) => {
            const button = (e.target as Element).closest('.code-window-try-live');
            if (!button) return;

            // LivePreview islands have their own onClick handler — don't double-fire.
            if (button.closest('[data-island="LivePreview"]') || button.closest('.live-preview-island')) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            const codeBase64 = button.getAttribute('data-live-code');
            const lang = button.getAttribute('data-lang') || 'tsx';
            const filename = button.getAttribute('data-filename') || '';

            if (!codeBase64) {
                console.error('[live-code] No code data found on Try Live button');
                return;
            }

            openPlaygroundModal(decodeBase64(codeBase64), lang, filename);
        });
    }

    if (!isRuntimeInitialized()) {
        initAllRuntimes().then(hydrateLivePreviewIslands).catch((err) => {
            console.warn('[live-code] Some runtimes failed to initialize:', err);
            hydrateLivePreviewIslands();
        });
    } else {
        hydrateLivePreviewIslands();
    }
}

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLiveCodeBlocks);
    } else {
        initLiveCodeBlocks();
    }

    // MutationObserver picks up islands added by SPA navigation / async content.
    const domObserver = new MutationObserver((mutations) => {
        let hasNewIslands = false;
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') continue;
            for (const node of mutation.addedNodes) {
                if (node instanceof HTMLElement && (
                    node.classList?.contains('live-preview-island') ||
                    node.querySelector?.('.live-preview-island')
                )) {
                    hasNewIslands = true;
                    break;
                }
            }
            if (hasNewIslands) break;
        }

        if (hasNewIslands) {
            clearTimeout((domObserver as any)._timeout);
            (domObserver as any)._timeout = setTimeout(hydrateLivePreviewIslands, 10);
        }
    });

    const startObserving = () => {
        domObserver.observe(document.body, { childList: true, subtree: true });
    };

    if (document.body) {
        startObserving();
    } else {
        document.addEventListener('DOMContentLoaded', startObserving);
    }

    window.addEventListener('sigx:mdx-hmr', () => {
        setTimeout(hydrateLivePreviewIslands, 50);
    });

    const hot = (import.meta as any).hot;
    if (hot) {
        hot.on('vite:afterUpdate', () => {
            setTimeout(hydrateLivePreviewIslands, 100);
        });
    }
}

