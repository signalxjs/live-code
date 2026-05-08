import { defineLibConfig } from '@sigx/vite/lib';

// Multi-entry build mirroring the package's exports map. `client` is its own
// entry so consumers (e.g. SSG `clientImports`) can pull it in without
// dragging the rest of the library through tree-shaking.
export default defineLibConfig({
    entry: {
        index: 'src/index.ts',
        client: 'src/client.tsx'
    },
    external: [
        '@sigx/monaco-editor',
        /^@sigx\/monaco-editor\//,
        /^@shikijs\//,
        'shiki',
        /^shiki\//,
        'sucrase'
    ],
    jsx: true,
    root: import.meta.url
});
