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
import { configurePlayground, getPlaygroundConfig, type PlaygroundConfig } from './playground-config';

export { injectStyles } from './utils/modal-styles';
export { configurePlayground, getPlaygroundConfig, type PlaygroundConfig, type OpenPlaygroundContext } from './playground-config';

let clickHandlerInitialized = false;
const hydratedIslands = new WeakSet<Element>();
// Islands we've rendered a preview into, tracked so we can tear them down when
// SPA navigation detaches or repurposes them (a WeakSet isn't enumerable).
const activePreviews = new Set<HTMLElement>();
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
        activePreviews.add(island);
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

/**
 * Tear down previews stranded by SPA navigation.
 *
 * Each preview is rendered out-of-band into the framework-owned island element.
 * When the host framework reuses that code-window DOM for the next route, it
 * patches the element but has no knowledge of our separately-rendered preview
 * subtree — so the old preview stays visible on the new page (an orphaned
 * `.code-window-preview-container` no longer inside a valid island). Run this on
 * navigation to remove those orphans before re-hydrating.
 */
function cleanupOrphanedPreviews() {
    for (const island of [...activePreviews]) {
        const stillValid =
            island.isConnected &&
            island.matches('.live-preview-island[data-island="LivePreview"]');
        if (stillValid) continue;

        // Fully detached from the document — safe to unmount the render root so
        // onUnmounted hooks (console subscription, preview cleanup) fire.
        if (!island.isConnected) {
            try {
                render(null as any, island);
            } catch {
                /* already torn down */
            }
        }
        activePreviews.delete(island);
        hydratedIslands.delete(island);
    }

    // A reused element keeps its identity but loses the island marker, so the
    // loop above can't `render(null)` it without risking the framework's new
    // content. Just remove the stranded preview chrome it left behind.
    const containers = document.querySelectorAll<HTMLElement>('.code-window-preview-container');
    for (const container of containers) {
        if (!container.closest('.live-preview-island[data-island="LivePreview"]')) {
            (container.closest('.code-window.code-window-preview') ?? container).remove();
        }
    }
}

let navigationHooksInstalled = false;

/**
 * Re-sync previews on SPA navigation. The host framework reuses code-window DOM
 * across routes and can't tear down our out-of-band previews, so we hook history
 * navigation (router `push`/`replace`) and back/forward to clean up and
 * re-hydrate. Deferred past the framework's own re-render of the new route, and
 * repeated once to absorb async/batched renders.
 */
function installNavigationHooks() {
    if (navigationHooksInstalled || typeof history === 'undefined') return;
    navigationHooksInstalled = true;

    const resync = () => {
        cleanupOrphanedPreviews();
        hydrateLivePreviewIslands();
    };
    const onNavigate = () => {
        setTimeout(resync, 0);
        setTimeout(resync, 80);
    };

    for (const method of ['pushState', 'replaceState'] as const) {
        const original = history[method];
        history[method] = function patched(this: History, ...args: unknown[]) {
            const result = (original as (...a: unknown[]) => unknown).apply(this, args);
            onNavigate();
            return result;
        } as History[typeof method];
    }
    window.addEventListener('popstate', onNavigate);
}

/**
 * Initialize live code block handlers. Safe to call multiple times (HMR-friendly).
 *
 * @param options - Optional playground overrides (trigger label, custom open handler),
 *                   forwarded to {@link configurePlayground}.
 */
export function initLiveCodeBlocks(options?: PlaygroundConfig) {
    if (options) configurePlayground(options);

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

            const code = decodeBase64(codeBase64);

            // Let consumers own the playground UI if they've configured a handler.
            const { openPlayground } = getPlaygroundConfig();
            if (openPlayground) {
                openPlayground({ code, language: lang, filename });
            } else {
                openPlaygroundModal(code, lang, filename);
            }
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
        document.addEventListener('DOMContentLoaded', () => initLiveCodeBlocks());
    } else {
        initLiveCodeBlocks();
    }

    // Clean up out-of-band previews the host framework strands on SPA navigation.
    installNavigationHooks();

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

