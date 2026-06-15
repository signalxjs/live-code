/**
 * Client-side initialization for live code blocks.
 *
 * The SSG Shiki transformer renders each interactive block as fully-formed,
 * SEO-visible SSR markup (a `code-window` with the highlighted code in the DOM).
 * This module **progressively enhances** that markup in place — it never
 * `render()`s over or wipes the server DOM, so the code sample stays in the HTML
 * and there is no structural divergence from the host framework's page
 * hydration (the cause of the duplicated-widget bug, signalxjs/live-code#34).
 *
 * Enhancement is delegated / event-based:
 *  - clicking a `.code-window-try-live` button opens the Monaco playground modal;
 *  - clicking a `.code-window-tab` switches the visible pane;
 *  - a `[data-live-preview]` block runs its code into its preview container when
 *    it scrolls into view, streaming console output into the console pane.
 */

import { render } from 'sigx';
import { LiveCodeModal } from './components/LiveCodeModal';
import { runCode, clearPreview, getConsoleLogs, onConsole, type ConsoleEntry } from './execution';
import { initAllRuntimes } from './runtime';
import { injectStyles } from './utils/modal-styles';
import { configurePlayground, getPlaygroundConfig, type PlaygroundConfig } from './playground-config';

export { injectStyles } from './utils/modal-styles';
export { configurePlayground, getPlaygroundConfig, type PlaygroundConfig, type OpenPlaygroundContext } from './playground-config';

let clickHandlerInitialized = false;
let modalCounter = 0;

/** Live-preview blocks we've attached a run-on-view observer to. */
const observedBlocks = new WeakSet<Element>();

/** A running preview: the container it ran into, the code it reflects, and the
 *  console subscription to tear down when the block is reused or detached. */
interface ActivePreview {
    containerId: string;
    /** `data-live-code` at run time — lets us detect a block reused for new code. */
    sig: string;
    offConsole: (() => void) | null;
}
const activePreviews = new Map<HTMLElement, ActivePreview>();

/**
 * Runtime init, shared and awaited by every preview run. `isRuntimeInitialized()`
 * flips true the instant `window.__SIGX__` is set — at the *start* of
 * `initAllRuntimes()`, before the optional runtimes (router / store / daisyui /
 * registered modules) finish — so gating a run on it can execute a preview
 * against half-loaded globals. Memoize the in-flight promise and await it.
 */
let runtimeReady: Promise<void> | null = null;
function ensureRuntimes(): Promise<void> {
    if (!runtimeReady) runtimeReady = initAllRuntimes();
    return runtimeReady;
}

function decodeBase64(str: string): string {
    try {
        return decodeURIComponent(escape(atob(str)));
    } catch {
        return atob(str);
    }
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
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

// --- Tab switching --------------------------------------------------------

/** Show the `tab` pane within a live-preview block and mark its button active. */
function switchTab(block: HTMLElement, tab: string) {
    for (const btn of block.querySelectorAll<HTMLElement>('.code-window-tab[data-tab]')) {
        btn.classList.toggle('code-window-tab-active', btn.getAttribute('data-tab') === tab);
    }
    for (const pane of block.querySelectorAll<HTMLElement>('[data-pane]')) {
        // '' restores the CSS default display; 'none' hides — mirrors the SSR
        // markup, which inlines `display:none` on every pane but the first.
        pane.style.display = pane.getAttribute('data-pane') === tab ? '' : 'none';
    }
}

// --- Console rendering ----------------------------------------------------

function consoleIcon(type: string): string {
    switch (type) {
        case 'error': return '✕';
        case 'warn': return '⚠';
        case 'info': return 'ℹ';
        default: return '›';
    }
}

/** Paint console output into the block's console pane and update the tab badge. */
function renderConsole(block: HTMLElement, logs: ConsoleEntry[]) {
    const pane = block.querySelector('.code-window-console-pane');
    if (pane) {
        pane.innerHTML = logs.length === 0
            ? '<div class="code-window-console-empty">No console output</div>'
            : logs.map((log) =>
                `<div class="code-window-console-line code-window-console-${log.type}">` +
                    `<span class="code-window-console-icon">${consoleIcon(log.type)}</span>` +
                    `<span class="code-window-console-text">${escapeHtml(log.args.join(' '))}</span>` +
                '</div>'
            ).join('');
    }

    const consoleTab = block.querySelector('.code-window-tab[data-tab="console"]');
    if (consoleTab) {
        let badge = consoleTab.querySelector('.code-window-tab-badge');
        if (logs.length > 0) {
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'code-window-tab-badge';
                consoleTab.appendChild(badge);
            }
            badge.textContent = String(logs.length);
        } else if (badge) {
            badge.remove();
        }
    }
}

// --- Preview execution ----------------------------------------------------

/** Tear down a block's running preview (console subscription + sandbox DOM). */
function teardownPreview(block: HTMLElement) {
    const active = activePreviews.get(block);
    if (!active) return;
    active.offConsole?.();
    clearPreview(document.getElementById(active.containerId));
    activePreviews.delete(block);
}

/** Run a `[data-live-preview]` block's code into its preview container. */
function runPreview(block: HTMLElement) {
    const container = block.querySelector<HTMLElement>('.code-window-preview-container');
    const codeBase64 = block.getAttribute('data-live-code');
    if (!container || !container.id || !codeBase64) return;
    const containerId = container.id;

    // A reused block (SPA nav) may already have a running preview — replace it.
    teardownPreview(block);

    const pane = block.querySelector('.code-window-preview-pane');
    const loadingEl = pane?.querySelector<HTMLElement>('.code-window-preview-loading') ?? null;
    const errorEl = pane?.querySelector<HTMLElement>('.code-window-error') ?? null;
    const setLoading = (on: boolean) => { if (loadingEl) loadingEl.style.display = on ? 'flex' : 'none'; };
    const setError = (msg: string | null) => {
        if (!errorEl) return;
        errorEl.style.display = msg ? 'flex' : 'none';
        const text = errorEl.querySelector('.code-window-error-text');
        if (text) text.textContent = msg ?? '';
    };

    // Subscribe to the live console stream (fires immediately, then per log).
    const offConsole = onConsole(containerId, (logs) => renderConsole(block, logs));
    activePreviews.set(block, { containerId, sig: codeBase64, offConsole });

    const code = decodeBase64(codeBase64);
    void (async () => {
        try {
            await ensureRuntimes();
            setLoading(true);
            setError(null);
            // Let the runtime injection settle before executing.
            await new Promise((resolve) => requestAnimationFrame(resolve));
            const result = await runCode(code, containerId);
            if (!result.success && result.error) setError(result.error);
            renderConsole(block, getConsoleLogs(containerId));
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
            console.error('[live-code] Failed to run preview:', err);
        } finally {
            setLoading(false);
        }
    })();
}

// --- Enhancement scan -----------------------------------------------------

/** Attach a run-on-view IntersectionObserver to any not-yet-observed blocks. */
function enhancePreviewBlocks() {
    const blocks = document.querySelectorAll<HTMLElement>('[data-live-preview]');
    const todo = Array.from(blocks).filter((block) => !observedBlocks.has(block));
    if (todo.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                runPreview(entry.target as HTMLElement);
            }
        }
    }, {
        rootMargin: '50px',
        threshold: 0.01,
    });

    for (const block of todo) {
        observedBlocks.add(block);
        observer.observe(block);
    }
}

/**
 * Re-sync previews after SPA navigation. The host framework reuses code-window
 * DOM across routes (keyless reconciliation patches the same element in place),
 * so a block we already ran can resurface carrying *different* code. For each
 * tracked preview whose block detached or whose `data-live-code` changed, tear
 * the stale run down — and immediately re-run a reused block, since it's already
 * on screen and won't re-trigger the (one-shot) IntersectionObserver. New blocks
 * are picked up by `enhancePreviewBlocks()`.
 */
function resyncPreviews() {
    for (const [block, active] of activePreviews) {
        const sig = block.getAttribute('data-live-code');
        const stillValid = block.isConnected && block.matches('[data-live-preview]') && sig === active.sig;
        if (stillValid) continue;

        teardownPreview(block);
        if (block.isConnected && block.matches('[data-live-preview]') && sig) {
            runPreview(block);
        }
    }
    enhancePreviewBlocks();
}

const NAVIGATE_EVENT = 'sigx:live-code-navigate';

/**
 * Re-sync previews on SPA navigation. The host framework reuses code-window DOM
 * across routes and can't re-run our previews, so we listen for a navigation
 * signal to re-sync — deferred past the framework's own re-render of the new
 * route, and repeated once to absorb async/batched renders.
 *
 * The history patch that emits the signal is installed once per page (guarded by
 * a marker on `window`), so HMR, multiple bundles, or several `@sigx/live-code`
 * instances don't re-wrap `history` or stack `popstate` listeners.
 */
function installNavigationHooks() {
    if (typeof window === 'undefined' || typeof history === 'undefined') return;

    const resync = () => resyncPreviews();
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
            const target = e.target as Element;

            // Tab switch within a live-preview block (pure show/hide, no modal).
            const tabBtn = target.closest('.code-window-tab[data-tab]');
            if (tabBtn) {
                const block = tabBtn.closest<HTMLElement>('[data-live-preview]');
                if (block) {
                    // Purely client-side show/hide — never let a tab button (even
                    // a stray `type="submit"`) submit a surrounding form.
                    e.preventDefault();
                    e.stopPropagation();
                    switchTab(block, tabBtn.getAttribute('data-tab') ?? 'preview');
                    return;
                }
            }

            // "Try Live" — preview blocks and standalone live blocks share the
            // same delegated handler now that both carry `data-live-code`.
            const button = target.closest('.code-window-try-live');
            if (!button) return;

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

    ensureRuntimes().then(enhancePreviewBlocks).catch((err) => {
        console.warn('[live-code] Some runtimes failed to initialize:', err);
        enhancePreviewBlocks();
    });
}

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => initLiveCodeBlocks());
    } else {
        initLiveCodeBlocks();
    }

    // Re-run previews the host framework strands or repurposes on SPA navigation.
    installNavigationHooks();

    // MutationObserver picks up preview blocks added/removed by SPA navigation /
    // async content, and — under core 0.6's keyless reconciler — blocks whose
    // `data-live-code` the framework rewrites *in place* on an element reused
    // across routes (childList alone misses that). We re-sync on a newly-added
    // or removed block (the latter so detached previews get torn down promptly,
    // not leaked) and on any `data-live-code` change within a block subtree —
    // the attribute can land on a descendant (e.g. the Try-Live button), so we
    // match the nearest `[data-live-preview]` ancestor, not just the target.
    // `pendingCodeChange` is sticky across debounced deliveries so an attribute
    // change in one batch survives a later childList-only batch that reschedules
    // the timer.
    const isOrContainsBlock = (node: Node): boolean =>
        node instanceof HTMLElement &&
        (node.hasAttribute?.('data-live-preview') || !!node.querySelector?.('[data-live-preview]'));

    let pendingCodeChange = false;
    const domObserver = new MutationObserver((mutations) => {
        let structuralChange = false;
        for (const mutation of mutations) {
            if (mutation.type === 'attributes') {
                const target = mutation.target;
                if (target instanceof HTMLElement &&
                    (target.hasAttribute('data-live-preview') || target.closest('[data-live-preview]'))) {
                    pendingCodeChange = true;
                }
                continue;
            }
            if (mutation.type !== 'childList') continue;
            for (const node of mutation.addedNodes) {
                if (isOrContainsBlock(node)) { structuralChange = true; break; }
            }
            if (structuralChange) continue;
            for (const node of mutation.removedNodes) {
                if (isOrContainsBlock(node)) { structuralChange = true; break; }
            }
        }

        if (structuralChange || pendingCodeChange) {
            clearTimeout((domObserver as any)._timeout);
            (domObserver as any)._timeout = setTimeout(() => {
                pendingCodeChange = false;
                resyncPreviews();
            }, 10);
        }
    });

    const startObserving = () => {
        domObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-live-code'],
        });
    };

    if (document.body) {
        startObserving();
    } else {
        document.addEventListener('DOMContentLoaded', startObserving);
    }

    window.addEventListener('sigx:mdx-hmr', () => {
        setTimeout(enhancePreviewBlocks, 50);
    });

    const hot = (import.meta as any).hot;
    if (hot) {
        hot.on('vite:afterUpdate', () => {
            setTimeout(enhancePreviewBlocks, 100);
        });
    }
}
