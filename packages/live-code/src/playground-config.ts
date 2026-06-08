/**
 * Playground configuration — lets consumers own the "open playground" action
 * without forking. Both the SSG "Try Live" button handler (`client.tsx`) and the
 * `LivePreview` island read this singleton, so a docs site can swap the label and
 * route the click to its own UI instead of the bundled `LiveCodeModal` — no
 * capture-phase click interception or label-rewriting MutationObserver needed.
 */

/** Source context handed to a custom {@link PlaygroundConfig.openPlayground} handler */
export interface OpenPlaygroundContext {
    /** Decoded source code for the block */
    code: string;
    /** Language id (e.g. `'tsx'`) */
    language: string;
    /** Optional filename shown in the window header */
    filename: string;
}

/** Global playground behavior overrides */
export interface PlaygroundConfig {
    /** Label for the "Try Live" trigger button (default: `'⚡ Try Live'`) */
    triggerLabel?: string;
    /**
     * Called instead of opening the bundled `LiveCodeModal` when a trigger is
     * activated. Use this to render your own playground window.
     */
    openPlayground?: (ctx: OpenPlaygroundContext) => void;
}

/** Default label when no `triggerLabel` is configured */
export const DEFAULT_TRIGGER_LABEL = '⚡ Try Live';

let config: PlaygroundConfig = {};

/**
 * Configure global playground behavior. Merges over any previous config, so it
 * can be called multiple times. Call before live code blocks are mounted.
 *
 * @example
 * configurePlayground({
 *     triggerLabel: 'Run',
 *     openPlayground: ({ code, language }) => myPlayground.open(code, language)
 * });
 */
export function configurePlayground(c: PlaygroundConfig): void {
    config = { ...config, ...c };
}

/** Read the current playground configuration */
export function getPlaygroundConfig(): PlaygroundConfig {
    return config;
}
