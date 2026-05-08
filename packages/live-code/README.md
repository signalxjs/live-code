# @sigx/live-code

Live code blocks for SignalX documentation — interactive code examples with a Monaco editor. Renders static syntax-highlighted code with a "Try Live" button that opens a full-screen playground for editing and running code in the browser.

The Monaco editor is provided by [`@sigx/monaco-editor`](https://github.com/signalxjs/monaco-editor) (peer dependency), which ships prebundled assets and a Vite plugin so Monaco doesn't slow down the host app's cold start.

## Install

```bash
npm install @sigx/live-code @sigx/monaco-editor
```

`@sigx/monaco-editor` is a peer dependency. It provides the prebundled Monaco runtime and the Vite plugin that serves it without slowing down dependency optimization.

## Setup

### 1. Wire the Vite plugin

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { monacoPlugin } from '@sigx/monaco-editor/vite';

export default defineConfig({
    plugins: [monacoPlugin()]
});
```

### 2. Import the styles

```ts
// main.ts
import '@sigx/live-code/styles';
```

## Usage

### As a JSX component

Drop a `<LiveCodeBlock>` anywhere in your sigx UI:

```tsx
import { LiveCodeBlock } from '@sigx/live-code';

const example = `
import { component, signal, render } from 'sigx';

const App = component(() => {
    const count = signal(0);
    return () => <button onClick={() => count.value++}>Count: {count.value}</button>;
});

render(<App />, document.getElementById('app')!);
`.trim();

<LiveCodeBlock code={example} language="tsx" />
```

The block renders syntax-highlighted code with a "Try Live" button that opens a full-screen Monaco-powered playground (`LiveCodeModal`) where the code can be edited and executed in the browser.

### From SSG / static markdown

If you render code blocks at build time (e.g. via a markdown pipeline), call `initLiveCodeBlocks()` from the client to attach the playground to every `<pre data-live-code>` element:

```ts
// client entry
import { initLiveCodeBlocks } from '@sigx/live-code/client';

initLiveCodeBlocks();
```

### Embedded editor + preview

For docs pages that should always show the editor (no modal), use `LiveCodeWindow`:

```tsx
import { LiveCodeWindow } from '@sigx/live-code';

<LiveCodeWindow code={example} language="tsx" />
```

### Registering additional modules

By default, code in the playground can `import` from `sigx`, `@sigx/router`, `@sigx/store`, and `@sigx/daisyui`. To expose more modules to user code, register them with `configureLiveCode`:

```ts
import { configureLiveCode } from '@sigx/live-code';
import * as myLib from 'my-lib';

configureLiveCode({
    modules: [
        {
            name: 'my-lib',
            globalName: 'MyLib',
            module: myLib,
            // optional: ambient .d.ts string for editor IntelliSense
            types: `declare module 'my-lib' { export function hello(): string; }`
        }
    ]
});
```

### Theming

```ts
import { SIGX_DARK_THEME, SIGX_LIGHT_THEME, createEditor } from '@sigx/live-code';

const editor = await createEditor(container, {
    value: '...',
    language: 'typescript',
    theme: SIGX_DARK_THEME // 'github-dark' | 'github-light' | any Shiki theme
});
```

## Key Exports

**Components**
- `LiveCodeBlock` — Static code display with "Try Live" button
- `LiveCodeWindow` — Embeddable editor + preview window
- `LiveCodeModal` — Full-screen playground modal
- `LivePreview` — Code output preview pane

**Editor** (re-exported / wired from `@sigx/monaco-editor`)
- `loadMonaco` / `createEditor` — Lazy-loaded Monaco editor integration with sigx ambient types
- `configureMonacoLoader` — Custom Monaco loader configuration

**Execution**
- `runCode` / `executeCode` — Transpile and execute TSX in the browser
- `transpileTsx` / `transformImports` — Code transformation utilities

**Runtime**
- `initRuntime` / `initAllRuntimes` — Initialize available module runtimes
- `configureLiveCode` — Register additional modules for the playground

## Documentation

Full documentation and guides are available at the [SignalX repository](https://github.com/signalxjs/core).

## License

[MIT](https://github.com/signalxjs/core/blob/main/LICENSE)
