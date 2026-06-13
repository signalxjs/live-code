// @vitest-environment happy-dom
/**
 * Regression tests for LivePreview island hydration across SPA navigation under
 * the core 0.6 SSR/hydration model (issue #31).
 *
 * Under core 0.6 an MDX page's island markup compiles to *keyless* vnodes, so
 * the host framework's reconciler reuses a previous route's
 * `.live-preview-island` element on SPA navigation and rewrites its
 * `data-island-props` attribute *in place* rather than replacing the node. These
 * tests reproduce that DOM behaviour synthetically (no full sigx render needed):
 *
 *  1. An island scanned while `data-island-props` is transiently absent must NOT
 *     log "No props found …" and must NOT be marked hydrated — so a later pass
 *     can still hydrate it once the framework writes the attribute.
 *  2. When the framework writes / rewrites `data-island-props` on a reused
 *     island, the `data-island-props` MutationObserver must re-sync and hydrate
 *     the preview with the *new* props.
 */
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from 'vitest';

const { renderSpy, livePreviewProps } = vi.hoisted(() => ({
    renderSpy: vi.fn(),
    livePreviewProps: [] as Array<Record<string, unknown>>,
}));

// Keep the module import side-effect-free and fast: stub `render` and the heavy
// component/runtime modules. sigx's jsx runtime invokes function components
// eagerly, so the LivePreview stub records the props it is handed at hydration.
vi.mock('sigx', async (importOriginal) => {
    const actual = await importOriginal<typeof import('sigx')>();
    return { ...actual, render: renderSpy };
});
vi.mock('../components/LiveCodeModal', () => ({ LiveCodeModal: () => null }));
vi.mock('../components/LivePreview', () => ({
    LivePreview: (props: Record<string, unknown>) => {
        livePreviewProps.push(props);
        return null;
    },
}));
vi.mock('../runtime', () => ({
    initAllRuntimes: vi.fn().mockResolvedValue(undefined),
    // Report runtimes ready so `initLiveCodeBlocks` hydrates synchronously.
    isRuntimeInitialized: () => true,
}));
vi.mock('../utils/modal-styles', () => ({ injectStyles: vi.fn() }));
vi.mock('../playground-config', () => ({
    configurePlayground: vi.fn(),
    getPlaygroundConfig: () => ({ triggerLabel: 'Try Live' }),
    DEFAULT_TRIGGER_LABEL: 'Try Live',
}));

/** IntersectionObserver stub: hydrate immediately on observe (island "visible"). */
class ImmediateIntersectionObserver {
    private cb: IntersectionObserverCallback;
    constructor(cb: IntersectionObserverCallback) {
        this.cb = cb;
    }
    observe(el: Element) {
        this.cb([{ target: el, isIntersecting: true } as IntersectionObserverEntry], this as any);
    }
    unobserve() {}
    disconnect() {}
    takeRecords() {
        return [];
    }
}

function islandPropsFor(code: string) {
    return JSON.stringify({
        code,
        highlightedCode: `<pre>${code}</pre>`,
        language: 'tsx',
        filename: 'example.tsx',
        tabs: ['preview', 'code'],
        live: true,
    });
}

function makeIsland(code: string | null): HTMLElement {
    const island = document.createElement('div');
    island.className = 'live-preview-island';
    island.setAttribute('data-island', 'LivePreview');
    if (code !== null) island.setAttribute('data-island-props', islandPropsFor(code));
    return island;
}

/** Wait for MutationObserver delivery (microtask) + the observer's 10ms debounce. */
function flush() {
    return new Promise((resolve) => setTimeout(resolve, 40));
}

/** The `code` prop passed to the most recently hydrated LivePreview. */
function lastRenderedCode(): unknown {
    return livePreviewProps.at(-1)?.code;
}

let errorSpy: ReturnType<typeof vi.spyOn>;

// Import the client exactly once: re-importing per test would re-run its
// top-level side effects (history patch, click handler, MutationObserver) and
// leak listeners across tests. With a single import the module's own
// MutationObserver picks up islands appended below — the same path SPA
// navigation exercises in production.
beforeAll(async () => {
    (globalThis as any).IntersectionObserver = ImmediateIntersectionObserver as any;
    await import('../client');
});

beforeEach(() => {
    renderSpy.mockClear();
    livePreviewProps.length = 0;
    document.body.innerHTML = '';
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    errorSpy.mockRestore();
});

function noPropsErrors() {
    return errorSpy.mock.calls.filter((c: unknown[]) => String(c[0]).includes('No props found'));
}

describe('LivePreview island hydration across SPA navigation (#31)', () => {
    it('hydrates an island present on hard load', async () => {
        document.body.appendChild(makeIsland('CODE_A'));
        await flush();

        expect(noPropsErrors()).toHaveLength(0);
        expect(lastRenderedCode()).toBe('CODE_A');
    });

    it('does not error and stays retryable when props are transiently missing', async () => {
        // A reused island whose `data-island-props` the framework has not yet
        // rewritten — the exact state that logged "No props found" before the fix.
        const island = makeIsland(null);
        document.body.appendChild(island);
        await flush();

        expect(noPropsErrors()).toHaveLength(0);
        expect(renderSpy).not.toHaveBeenCalled();

        // Framework writes the attribute → MutationObserver must hydrate now.
        island.setAttribute('data-island-props', islandPropsFor('CODE_LATE'));
        await flush();

        expect(noPropsErrors()).toHaveLength(0);
        expect(lastRenderedCode()).toBe('CODE_LATE');
    });

    it('re-hydrates with new props when a reused island\'s props are rewritten', async () => {
        // Page A: island hydrated with CODE_A.
        const island = makeIsland('CODE_A');
        document.body.appendChild(island);
        await flush();
        expect(lastRenderedCode()).toBe('CODE_A');

        // SPA nav to page B: the reconciler reuses the same element and rewrites
        // its props in place (no node replacement).
        island.setAttribute('data-island-props', islandPropsFor('CODE_B'));
        await flush();

        expect(noPropsErrors()).toHaveLength(0);
        expect(lastRenderedCode()).toBe('CODE_B');
    });
});
