// @vitest-environment happy-dom
/**
 * Tests for the progressive-enhancement client (issues #31, #34).
 *
 * The SSG ships each interactive block as SEO-visible SSR markup
 * (`[data-live-preview]` with the highlighted code in the DOM). The client
 * enhances it in place — it runs the preview on view, switches tabs, and opens
 * the playground — and must NEVER wipe or re-render the SSR markup (that wipe was
 * the cause of the duplicated-widget bug #34). It must also re-run a block the
 * SPA reconciler reuses for different code across navigation (#31).
 */
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';

const { runCodeSpy, openPlaygroundSpy, offConsoleSpy, consoleHolder } = vi.hoisted(() => ({
    runCodeSpy: vi.fn(),
    openPlaygroundSpy: vi.fn(),
    offConsoleSpy: vi.fn(),
    // Captures the live-console listener so a test can push arbitrary log entries.
    consoleHolder: { cb: null as null | ((logs: unknown[]) => void) },
}));

vi.mock('sigx', async (importOriginal) => {
    const actual = await importOriginal<typeof import('sigx')>();
    return { ...actual, render: vi.fn() };
});
vi.mock('../components/LiveCodeModal', () => ({ LiveCodeModal: () => null }));
vi.mock('../execution', () => ({
    runCode: (...args: unknown[]) => runCodeSpy(...args),
    clearPreview: vi.fn(),
    clearConsole: vi.fn(),
    getConsoleLogs: () => [],
    onConsole: (_id: string, cb: (logs: unknown[]) => void) => { consoleHolder.cb = cb; return offConsoleSpy; },
}));
vi.mock('../runtime', () => ({
    initAllRuntimes: vi.fn().mockResolvedValue(undefined),
    isRuntimeInitialized: () => true,
}));
vi.mock('../utils/modal-styles', () => ({ injectStyles: vi.fn() }));
vi.mock('../playground-config', () => ({
    configurePlayground: vi.fn(),
    // A consumer-provided handler so Try-Live is observable without a real modal.
    getPlaygroundConfig: () => ({ openPlayground: openPlaygroundSpy }),
    DEFAULT_TRIGGER_LABEL: 'Try Live',
}));

/** IntersectionObserver stub: fire "visible" immediately on observe. */
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

let blockSeq = 0;

/** Build the SSR markup the Shiki transformer emits for a live-preview block. */
function makeBlock(code: string, { tabs = ['preview', 'code'], live = true } = {}): HTMLElement {
    const b64 = btoa(code);
    const containerId = `sigx-preview-test-${blockSeq++}`;
    const block = document.createElement('div');
    block.className = 'live-preview-island';
    block.setAttribute('data-live-preview', '');
    block.setAttribute('data-live-code', b64);
    block.setAttribute('data-lang', 'tsx');
    block.setAttribute('data-tabs', tabs.join(','));
    if (live) block.setAttribute('data-live', 'true');
    block.innerHTML = `
      <div class="code-window code-window-live code-window-preview">
        <div class="code-window-header">
          <div class="code-window-tabs">
            ${tabs.map((t, i) => `<button class="code-window-tab${i === 0 ? ' code-window-tab-active' : ''}" data-tab="${t}">${t}</button>`).join('')}
          </div>
          ${live ? `<button class="code-window-try-live" data-live-code="${b64}" data-lang="tsx" data-filename="">Try Live</button>` : ''}
        </div>
        <div class="code-window-preview-pane" data-pane="preview">
          <div class="code-window-error" style="display:none;"><pre class="code-window-error-text"></pre></div>
          <div class="code-window-preview-loading" style="display:none;"><span class="code-window-spinner"></span>Loading preview...</div>
          <div class="code-window-preview-container" id="${containerId}"></div>
        </div>
        <div class="code-window-console-pane" data-pane="console" style="display:none;"><div class="code-window-console-empty">No console output</div></div>
        <div class="code-window-content" data-pane="code" style="display:none;"><pre>${code}</pre></div>
      </div>`;
    return block;
}

/**
 * Wait for a fixed slice of time.
 *
 * Only for asserting that something *doesn't* happen — there is no condition to
 * poll for an absence. Anything asserting that enhancement HAS happened must use
 * `vi.waitFor` instead: MutationObserver delivery plus the observer's 10ms
 * debounce plus the async run has no bounded duration, and guessing one is what
 * made this suite flake on slower runners (#75).
 */
function settleQuiet() {
    return new Promise((resolve) => setTimeout(resolve, 50));
}

/**
 * Resolve once the block has been enhanced and its preview run has started.
 *
 * Waits for the count to be *reached* rather than sleeping and hoping, then
 * settles and re-asserts so the count is also not EXCEEDED — a duplicate run is
 * the bug #34 was about, and `waitFor` alone would return the moment it first
 * matched and never notice a second one.
 */
async function enhanced(times = 1) {
    await vi.waitFor(() => expect(runCodeSpy).toHaveBeenCalledTimes(times));
    await settleQuiet();
    expect(runCodeSpy).toHaveBeenCalledTimes(times);
}

beforeAll(async () => {
    (globalThis as any).IntersectionObserver = ImmediateIntersectionObserver as any;
    // Deterministic rAF so runPreview's await resolves synchronously-ish.
    (globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) => {
        cb(0);
        return 0;
    };
    await import('../client');
});

beforeEach(() => {
    runCodeSpy.mockReset();
    runCodeSpy.mockResolvedValue({ success: true });
    openPlaygroundSpy.mockReset();
    offConsoleSpy.mockReset();
    document.body.innerHTML = '';
});

describe('progressive enhancement — run on view (#34)', () => {
    it('runs the preview code into the container when the block scrolls into view', async () => {
        document.body.appendChild(makeBlock('PREVIEW_CODE'));
        await enhanced();

        const [code, containerId] = runCodeSpy.mock.calls[0];
        expect(code).toBe('PREVIEW_CODE');
        expect(String(containerId)).toMatch(/^sigx-preview-test-\d+$/);
    });

    it('never wipes the SSR markup — the code stays in the HTML', async () => {
        const block = makeBlock('VISIBLE_CODE');
        document.body.appendChild(block);
        await enhanced();

        // The content pane and its highlighted code survive enhancement (SEO/AI).
        expect(block.querySelector('.code-window-content')).not.toBeNull();
        expect(block.textContent).toContain('VISIBLE_CODE');
        // Exactly one widget — no duplicate code-window injected.
        expect(block.querySelectorAll('.code-window')).toHaveLength(1);
    });
});

describe('progressive enhancement — delegated interactions', () => {
    it('switches the visible pane when a tab is clicked', async () => {
        const block = makeBlock('CODE', { tabs: ['preview', 'code'] });
        document.body.appendChild(block);
        await enhanced();

        const codeTab = block.querySelector<HTMLElement>('.code-window-tab[data-tab="code"]')!;
        codeTab.click();

        const previewPane = block.querySelector<HTMLElement>('[data-pane="preview"]')!;
        const codePane = block.querySelector<HTMLElement>('[data-pane="code"]')!;
        expect(codePane.style.display).toBe('');
        expect(previewPane.style.display).toBe('none');
        expect(codeTab.classList.contains('code-window-tab-active')).toBe(true);
    });

    it('opens the playground when the Try Live button is clicked', async () => {
        const block = makeBlock('EDIT_ME');
        document.body.appendChild(block);
        await enhanced();

        block.querySelector<HTMLElement>('.code-window-try-live')!.click();

        expect(openPlaygroundSpy).toHaveBeenCalledTimes(1);
        expect(openPlaygroundSpy.mock.calls[0][0]).toMatchObject({ code: 'EDIT_ME', language: 'tsx' });
    });
});

describe('progressive enhancement — console rendering', () => {
    it('clamps an attacker-controlled log type before it reaches HTML', async () => {
        const block = makeBlock('CODE');
        document.body.appendChild(block);
        await enhanced();

        // Preview code can mutate window.__LIVE_CODE_CONSOLE__ with any `type`.
        consoleHolder.cb?.([{ type: '"><img src=x onerror=alert(1)>', args: ['hi'] }]);

        const pane = block.querySelector('.code-window-console-pane')!;
        // No HTML injection: the malicious type never becomes markup.
        expect(pane.querySelector('img')).toBeNull();
        expect(pane.innerHTML).not.toContain('onerror');
        // Unknown type is clamped to the default class + icon.
        const line = pane.querySelector('.code-window-console-line')!;
        expect(line.className).toContain('code-window-console-log');
        expect(pane.querySelector('.code-window-console-text')?.textContent).toBe('hi');
    });

    it('keeps a known log type on the rendered line', async () => {
        const block = makeBlock('CODE');
        document.body.appendChild(block);
        await enhanced();

        consoleHolder.cb?.([{ type: 'error', args: ['boom'] }]);

        const line = block.querySelector('.code-window-console-pane .code-window-console-line')!;
        expect(line.className).toContain('code-window-console-error');
    });
});

describe('progressive enhancement — teardown', () => {
    it('tears down a removed block so its console subscription does not leak', async () => {
        const block = makeBlock('GOODBYE');
        document.body.appendChild(block);
        await enhanced();

        offConsoleSpy.mockClear();
        block.remove();

        // The removed block's preview run was torn down (unsubscribed).
        await vi.waitFor(() => expect(offConsoleSpy).toHaveBeenCalled());
    });

    it('re-observes and re-runs a block that is detached then re-attached', async () => {
        const block = makeBlock('REATTACH');
        document.body.appendChild(block);
        await enhanced();

        block.remove();
        // Detach teardown is observable — wait for it rather than guessing a
        // duration, or the reattach below can race a detach still in flight.
        await vi.waitFor(() => expect(offConsoleSpy).toHaveBeenCalled());

        document.body.appendChild(block);
        // Cleared from the observed set on detach → re-observed → re-run on reattach.
        await enhanced(2);
    });
});

describe('progressive enhancement — SPA reuse (#31)', () => {
    it('re-runs a reused block whose data-live-code is rewritten in place', async () => {
        const block = makeBlock('CODE_A');
        document.body.appendChild(block);
        await enhanced();
        expect(runCodeSpy.mock.calls.at(-1)?.[0]).toBe('CODE_A');

        // SPA nav: the reconciler reuses the element and rewrites its code attr;
        // a navigation signal drives the re-sync (reliable, unlike racing the
        // attribute MutationObserver under happy-dom / Node 20).
        block.setAttribute('data-live-code', btoa('CODE_B'));
        window.dispatchEvent(new Event('sigx:live-code-navigate'));

        await vi.waitFor(() => expect(runCodeSpy.mock.calls.at(-1)?.[0]).toBe('CODE_B'));
    });

    it('re-runs a reused block whose preview container is swapped (same code)', async () => {
        const block = makeBlock('SAME_CODE');
        document.body.appendChild(block);
        await enhanced();
        const firstId = String(runCodeSpy.mock.calls[0][1]);

        // SPA nav reuses the element and its code but replaces the preview
        // container node with a new id, leaving data-live-code unchanged. The
        // tracked run now points at a stale container/console subscription.
        const container = block.querySelector<HTMLElement>('.code-window-preview-container')!;
        const newId = `${firstId}-swapped`;
        container.id = newId;
        offConsoleSpy.mockClear();

        // A navigation signal drives the re-sync (data-live-code didn't change).
        history.pushState({}, '', '/next');

        // Stale run torn down (unsubscribed) and re-run into the new container.
        await enhanced(2);
        expect(offConsoleSpy).toHaveBeenCalled();
        expect(String(runCodeSpy.mock.calls[1][1])).toBe(newId);
    });

    it('retries a block that was not ready (no container) on a later scan', async () => {
        const block = makeBlock('LATER');
        // Markup not ready yet: the run container is missing.
        block.querySelector('.code-window-preview-container')!.remove();
        document.body.appendChild(block);
        await settleQuiet();
        expect(runCodeSpy).not.toHaveBeenCalled();

        // Container shows up, then a re-sync retries the block. Trigger the
        // re-sync via the SPA-navigation hook (a plain setTimeout path) rather
        // than an attribute mutation — happy-dom's attribute-MutationObserver
        // delivery is unreliable across engines (flaked on Node 20).
        const c = document.createElement('div');
        c.className = 'code-window-preview-container';
        c.id = 'sigx-preview-late';
        block.querySelector('.code-window-preview-pane')!.appendChild(c);
        window.dispatchEvent(new Event('sigx:live-code-navigate'));

        await vi.waitFor(() => expect(runCodeSpy).toHaveBeenCalledTimes(1));
        expect(runCodeSpy.mock.calls.at(-1)?.[0]).toBe('LATER');
    });

    it('a superseded in-flight run does not clobber the newer run', async () => {
        // First run hangs so a second run can supersede it before it resolves.
        let resolveFirst: (v: unknown) => void = () => {};
        runCodeSpy.mockImplementationOnce(() => new Promise((r) => { resolveFirst = r; }));
        runCodeSpy.mockResolvedValue({ success: true });

        const block = makeBlock('CODE_A');
        document.body.appendChild(block);
        await enhanced(); // run 1 started; runCode(CODE_A) is pending

        // Rewrite the code + drive the re-sync via the SPA-nav hook (reliable),
        // then wait until run 2 (CODE_B) has actually started — so run 1 is
        // genuinely superseded before it resolves below.
        block.setAttribute('data-live-code', btoa('CODE_B'));
        window.dispatchEvent(new Event('sigx:live-code-navigate'));
        await vi.waitFor(() => expect(runCodeSpy.mock.calls.at(-1)?.[0]).toBe('CODE_B'));

        const callsBefore = runCodeSpy.mock.calls.length;
        resolveFirst({ success: false, error: 'STALE_ERROR' }); // run 1 resolves late
        await settleQuiet();

        // Run 1's late resolution is ignored: no extra run, no stale error painted.
        expect(runCodeSpy.mock.calls.length).toBe(callsBefore);
        expect(block.querySelector('.code-window-error-text')?.textContent).not.toBe('STALE_ERROR');
    });
});
