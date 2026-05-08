import { defineLibConfig } from '@sigx/vite/lib';

export default defineLibConfig({
    entry: 'src/index.ts',
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
