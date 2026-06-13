import { defineConfig } from 'vitest/config';

// JSX must compile to the sigx automatic runtime (same settings the library
// build uses via `@sigx/vite`), so tests can import the TSX client/components.
export default defineConfig({
    oxc: {
        jsx: {
            runtime: 'automatic',
            importSource: 'sigx',
        },
    },
    test: {
        include: ['packages/*/src/**/*.{test,spec}.{ts,tsx}'],
    },
});
