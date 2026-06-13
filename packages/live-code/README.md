# @sigx/live-code

Live code blocks for SignalX documentation — interactive code examples with a Monaco editor. Renders static syntax-highlighted code with a "Try Live" button that opens a full-screen playground for editing and running code in the browser.

The Monaco editor is provided by [`@sigx/monaco-editor`](https://sigx.dev/monaco/) (peer dependency), which ships prebundled assets and a Vite plugin so Monaco doesn't slow down the host app's cold start.

## 📚 Documentation

Full guides, API reference and live examples → **<https://sigx.dev/>**

## Install

```bash
npm install @sigx/live-code @sigx/monaco-editor
```

## A quick taste

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

It renders syntax-highlighted code with a "Try Live" button that opens a full-screen Monaco-powered playground where the code can be edited and executed in the browser. There's also `LiveCodeWindow` (always-on editor + preview), an SSG `initLiveCodeBlocks()` client helper, a headless execution API, and configuration hooks for registering extra modules, theming, and routing "Try Live" to your own UI.

See the docs for setup, the full component/execution API, and live examples → <https://sigx.dev/>

## Part of SignalX

- [sigx](https://sigx.dev/core/) — the core framework
- [`@sigx/monaco-editor`](https://sigx.dev/monaco/) — prebundled Monaco editor + Vite plugin
- [`@sigx/router`](https://sigx.dev/router/) · [`@sigx/store`](https://sigx.dev/store/) · [`@sigx/daisyui`](https://sigx.dev/daisyui/) — modules available in the playground by default

## License

[MIT](https://github.com/signalxjs/live-code/blob/main/LICENSE)
