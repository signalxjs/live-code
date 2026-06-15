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

const { runCodeSpy, openPlaygroundSpy, offConsoleSpy } = vi.hoisted(() => ({
    runCodeSpy: vi.fn(),
    openPlaygroundSpy: vi.fn(),
    offConsoleSpy: vi.fn(),
}));

vi.mock('sigx', async (importOriginal) => {
    const actual = await importOriginal<typeof import('sigx')>();
    return { ...actual, render: vi.fn() };
});
vi.mock('../components/LiveCodeModal', () => ({ LiveCodeModal: () => null }));
vi.mock('../execution', () => ({
    runCode: (...args: unknown[]) => runCodeSpy(...args),
    clearPreview: vi.fn(),
    getConsoleLogs: () => [],
    onConsole: () => offConsoleSpy,
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

/** Await MutationObserver delivery + the observer's 10ms debounce + async run. */
function flush() {
    return new Promise((resolve) => setTimeout(resolve, 50));
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
        await flush();

        expect(runCodeSpy).toHaveBeenCalledTimes(1);
        const [code, containerId] = runCodeSpy.mock.calls[0];
        expect(code).toBe('PREVIEW_CODE');
        expect(String(containerId)).toMatch(/^sigx-preview-test-\d+$/);
    });

    it('never wipes the SSR markup — the code stays in the HTML', async () => {
        const block = makeBlock('VISIBLE_CODE');
        document.body.appendChild(block);
        await flush();

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
        await flush();

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
        await flush();

        block.querySelector<HTMLElement>('.code-window-try-live')!.click();

        expect(openPlaygroundSpy).toHaveBeenCalledTimes(1);
        expect(openPlaygroundSpy.mock.calls[0][0]).toMatchObject({ code: 'EDIT_ME', language: 'tsx' });
    });
});

describe('progressive enhancement — teardown', () => {
    it('tears down a removed block so its console subscription does not leak', async () => {
        const block = makeBlock('GOODBYE');
        document.body.appendChild(block);
        await flush();
        expect(runCodeSpy).toHaveBeenCalled();

        offConsoleSpy.mockClear();
        block.remove();
        await flush();

        // The removed block's preview run was torn down (unsubscribed).
        expect(offConsoleSpy).toHaveBeenCalled();
    });
});

describe('progressive enhancement — SPA reuse (#31)', () => {
    it('re-runs a reused block whose data-live-code is rewritten in place', async () => {
        const block = makeBlock('CODE_A');
        document.body.appendChild(block);
        await flush();
        expect(runCodeSpy.mock.calls.at(-1)?.[0]).toBe('CODE_A');

        // SPA nav: the reconciler reuses the element and rewrites its code attr.
        block.setAttribute('data-live-code', btoa('CODE_B'));
        await flush();

        expect(runCodeSpy.mock.calls.at(-1)?.[0]).toBe('CODE_B');
    });
});
