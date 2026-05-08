# @sigx/live-code

Live, executable code blocks for [sigx](https://github.com/signalxjs/core) documentation. Renders a Monaco editor next to a sandboxed preview that runs your sigx components in real time, with TypeScript/JSX compilation done in-browser via [sucrase](https://github.com/alangpierce/sucrase).

Used by the official sigx docs, but reusable in any sigx app or docs site.

## Why this exists

Documentation is much more useful when readers can edit the code and immediately see the result. `@sigx/live-code` gives you a drop-in `<LiveCodeBlock>` component (and a `LivePreview` island for SSG) so docs authors can ship interactive examples without each page rolling its own playground.

The Monaco editor is loaded on demand from [`@sigx/monaco-editor`](https://github.com/signalxjs/monaco-editor), which ships prebundled assets and a Vite plugin that bypasses dependency optimization — so Monaco doesn't slow down the cold start of every consumer app.

## Layout

```
live-code/
└── packages/
    └── live-code/        # @sigx/live-code — the library
```

## Packages

- [`@sigx/live-code`](./packages/live-code/README.md) — runtime, components, and editor wiring.

## Quick start

```bash
pnpm install
pnpm build
```

## License

MIT
