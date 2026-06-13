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

/** A hydrated preview: the element we rendered into and the props it reflects. */
interface ActivePreview {
    /** The element we `render()`ed the LivePreview into (a child of the island). */
    mount: HTMLElement;
    /** The island's `data-island-props` at hydration time, to detect reuse. */
    sig: string;
}

// Previews we've rendered, keyed by island element, tracked so we can tear them
// down when SPA navigation detaches, repurposes, or reuses the island (a WeakSet
// isn't enumerable, and we need the mount + signature to clean up correctly).
const activePreviews = new Map<HTMLElement, ActivePreview>();
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

    const propsJson = island.getAttribute('data-island-props');
    if (!propsJson) {
        // No props yet. Under the core 0.6 SSR/hydration model an MDX page's
        // island markup compiles to keyless vnodes, so on SPA navigation the
        // host framework *reuses* a previous route's island element and patches
        // its attributes in place. `data-island-props` is therefore transiently
        // absent (or not yet rewritten to the new route's value) at the instant
        // we scan — not a real error. Leave the island unhydrated and bail; the
        // `data-island-props` MutationObserver below re-runs hydration the
        // moment the framework writes the attribute, so the preview still
        // arrives. (Emitting an error here is what surfaced as
        // "No props found for LivePreview island" on every SPA navigation.)
        return;
    }

    // Render into a dedicated mount element we own (a child of the island).
    // The host framework reconciles the island itself across SPA navigation, so
    // owning the mount lets us always `render(null, mount)` — firing
    // LivePreview's onUnmounted cleanup (console subscription, preview teardown)
    // — even after the framework has repurposed the island element.
    const mount = document.createElement('div');
    mount.className = 'lc-preview-mount';

    // Mark hydrated *before* clearing content to prevent double hydration.
    hydratedIslands.add(island);
    activePreviews.set(island, { mount, sig: propsJson });
    island.innerHTML = '';
    island.appendChild(mount);

    try {
        const props = JSON.parse(propsJson);
        render(
            <LivePreview
                code={props.code}
                highlightedCode={props.highlightedCode}
                language={props.language}
                filename={props.filename}
                tabs={props.tabs}
                live={props.live}
            />,
            mount
        );
    } catch (err) {
        // Roll back tracking so a later resync can retry this island.
        try {
            render(null as unknown as never, mount);
        } catch {
            /* nothing mounted yet */
        }
        mount.remove();
        activePreviews.delete(island);
        hydratedIslands.delete(island);
        console.error('[live-code] Failed to hydrate LivePreview island:', err);
    }
}

/**
 * Tear down previews stranded by SPA navigation.
 *
 * Each preview is rendered out-of-band into a mount we own inside the
 * framework-owned island element. When the host framework navigates, it reuses
 * island DOM for the next route but has no knowledge of our mount — so a preview
 * can be left detached, stranded inside a repurposed element, or showing the
 * previous page's content in an island reused for different code. For each we
 * unmount the render root (firing onUnmounted) and remove the mount; valid
 * islands whose props changed are also dropped from tracking so the subsequent
 * `hydrateLivePreviewIslands()` re-hydrates them with the new content.
 */
function cleanupOrphanedPreviews() {
    for (const [island, { mount, sig }] of activePreviews) {
        const stillValid =
            island.isConnected &&
            island.matches('.live-preview-island[data-island="LivePreview"]') &&
            island.getAttribute('data-island-props') === sig;
        if (stillValid) continue;

        // Detached, repurposed, or reused for different content. Unmounting our
        // own mount is always safe (it's a separate render root), so onUnmounted
        // hooks fire without touching whatever the framework now owns.
        try {
            render(null as unknown as never, mount);
        } catch {
            /* already torn down */
        }
        mount.remove();
        activePreviews.delete(island);
        hydratedIslands.delete(island);
    }
}

const NAVIGATE_EVENT = 'sigx:live-code-navigate';

/**
 * Re-sync previews on SPA navigation. The host framework reuses code-window DOM
 * across routes and can't tear down our out-of-band previews, so we listen for a
 * navigation signal to clean up and re-hydrate — deferred past the framework's
 * own re-render of the new route, and repeated once to absorb async/batched
 * renders.
 *
 * The history patch that emits the signal is installed once per page (guarded by
 * a marker on `window`), so HMR, multiple bundles, or several `@sigx/live-code`
 * instances don't re-wrap `history` or stack `popstate` listeners — each
 * instance just listens for the shared event and re-syncs its own previews.
 */
function installNavigationHooks() {
    if (typeof window === 'undefined' || typeof history === 'undefined') return;

    const resync = () => {
        cleanupOrphanedPreviews();
        hydrateLivePreviewIslands();
    };
    window.addEventListener(NAVIGATE_EVENT, () => {
        setTimeout(resync, 0);
        setTimeout(resync, 80);
    });

    const marker = '__sigxLiveCodeHistoryPatched__';
    if ((window as unknown as Record<string, unknown>)[marker]) return;
    (window as unknown as Record<string, unknown>)[marker] = true;

    const emit = () => window.dispatchEvent(new Event(NAVIGATE_EVENT));
    for (const method of ['pushState', 'replaceState'] as const) {
        const original = history[method];
        history[method] = function patched(this: History, ...args: unknown[]) {
            const result = (original as (...a: unknown[]) => unknown).apply(this, args);
            emit();
            return result;
        } as History[typeof method];
    }
    window.addEventListener('popstate', emit);
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

    // MutationObserver picks up islands added by SPA navigation / async content,
    // and — crucially under core 0.6 — islands whose `data-island-props` the host
    // framework rewrites *in place* on an element reused across routes. The
    // keyless reconciler reuses a prior route's island `<div>` and patches its
    // attributes rather than replacing the node, so the only reliable signal that
    // a reused island now carries new content is the `data-island-props`
    // attribute mutation; childList alone misses it. So we resync on both a
    // newly-added island and a `data-island-props` change — the latter also
    // tearing down the now-stale out-of-band preview before re-hydrating.
    // `pendingPropsChange` is *sticky* across observer deliveries: the resync is
    // debounced, so an attribute change in one batch must survive a later
    // childList-only batch that reschedules the timer. It's cleared only when
    // the debounced callback actually runs.
    let pendingPropsChange = false;
    const domObserver = new MutationObserver((mutations) => {
        let hasNewIslands = false;
        for (const mutation of mutations) {
            if (mutation.type === 'attributes') {
                const target = mutation.target;
                if (target instanceof HTMLElement && target.classList.contains('live-preview-island')) {
                    pendingPropsChange = true;
                }
                continue;
            }
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
        }

        if (hasNewIslands || pendingPropsChange) {
            clearTimeout((domObserver as any)._timeout);
            (domObserver as any)._timeout = setTimeout(() => {
                // A reused island whose props changed needs its stale preview
                // torn down first; a brand-new island just needs hydration.
                const propsChanged = pendingPropsChange;
                pendingPropsChange = false;
                if (propsChanged) cleanupOrphanedPreviews();
                hydrateLivePreviewIslands();
            }, 10);
        }
    });

    const startObserving = () => {
        domObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-island-props']
        });
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

