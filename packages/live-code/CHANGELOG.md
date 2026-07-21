# Changelog

All notable changes to `@sigx/live-code` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.5.0] - 2026-07-21

### Changed

- **Aligned with SignalX core 0.12** ([#57](https://github.com/signalxjs/live-code/issues/57)). Core moved 0.10 → 0.11 → 0.12 on npm `latest`, and the satellites followed (daisyui/router/store 0.9, all peering `sigx ^0.12.0`). live-code 0.4.0's `<0.9` peers on daisyui/router/store were an unmaskable diamond conflict with the core-0.12 stack — the primary blocker holding the docs site on core 0.10.
  - `sigx`: `>=0.10.0 <0.11.0` → `>=0.12.0 <0.13.0`
  - `@sigx/monaco-editor`: `>=0.3.0 <0.4.0` → `>=0.4.0 <0.5.0`
  - `@sigx/router`: `>=0.8.0 <0.9.0` → `>=0.9.0 <0.10.0`
  - `@sigx/store`: `>=0.8.0 <0.9.0` → `>=0.9.0 <0.10.0`
  - `@sigx/daisyui`: `>=0.8.0 <0.9.0` → `>=0.9.0 <0.10.0`
  - devDependencies: `sigx`, `@sigx/vite` → `^0.12.0`; `@sigx/monaco-editor` → `^0.4.0`
  - `@sigx/router`, `@sigx/store`, and `@sigx/daisyui` remain optional peers, reached via the sandbox's `window.__SIGX_*` globals rather than bound directly.

  No source changes: the runtime binds only stable core primitives (`component`, `signal`, `onMounted`, `onUnmounted`, `render`).

- **Regenerated the playground IntelliSense snapshot against core 0.12** ([#57](https://github.com/signalxjs/live-code/issues/57)). `src/types/generated-modules.ts` — the bundled type snapshot Monaco uses to typecheck playground snippets — now reflects the core 0.12 + satellites 0.9 public surface, picking up new API such as `onScopeDispose` and the signal type-guards.

## [0.4.0] - 2026-07-16

### Fixed

- **The playground's IntelliSense advertised APIs that no longer exist** ([#50](https://github.com/signalxjs/live-code/issues/50)). `src/types/generated-modules.ts` — the bundled type snapshot Monaco uses to typecheck playground snippets — is generated from whatever is installed in `node_modules`, and the peer floors (`sigx >=0.4.0`, `@sigx/store >=0.3.0`, `@sigx/daisyui >=0.3.0`) resolved to `sigx@0.7.0` / `@sigx/store@0.3.2` / `@sigx/daisyui@0.3.2`. The shipped snapshot therefore still declared `Suspense`/`SuspenseProps`, `useAsync` (with `throwOnError`), `ErrorBoundary`/`ErrorBoundaryProps`, and an app-config `errorHandler` — **all removed in core 0.9**. Playground users got completions and type-checking for APIs that fail at runtime. The snapshot is now regenerated against the core 0.10 set: those four symbols are gone, and core 0.10's actual async surface (`useData`, `useAction`, `Defer`, `errorScope`, `app.onError`) is present.

### Changed

- **Aligned with SignalX core 0.10** ([#50](https://github.com/signalxjs/live-code/issues/50)). Peer ranges are now bounded instead of floor-only, so they state what is actually supported rather than silently accepting any future core:
  - `sigx`: `>=0.4.0` → `>=0.10.0 <0.11.0`
  - `@sigx/router`: `>=0.7.0` → `>=0.8.0 <0.9.0` (router 0.8 is the core-0.10 release — it no longer mirrors core's minor)
  - `@sigx/store`: `>=0.3.0` → `>=0.8.0 <0.9.0` (store 0.7 caps core at `<0.7.0`)
  - `@sigx/daisyui`: `>=0.3.0` → `>=0.8.0 <0.9.0` (daisyui 0.7 caps core at `<0.8.0`)
  - `@sigx/monaco-editor`: `>=0.1.0` → `>=0.3.0 <0.4.0`
  - devDependencies: `sigx`, `@sigx/vite` → `^0.10.0`; `@sigx/monaco-editor` → `^0.3.0`
  - `@sigx/router`, `@sigx/store`, and `@sigx/daisyui` remain optional peers.

  No source changes: the runtime already used the namespaced `Define.Prop`/`Define.Event`/`Define.Slot` form and optional-chained slot calls, and never touched any of core's removed APIs. The string-injected runtime (`defineApp`, `app.mount(target, renderFn)`, `render`, `jsx*` off `window.__SIGX__`) was checked against core's 0.8/0.9/0.10 changelog — no signature changes.
