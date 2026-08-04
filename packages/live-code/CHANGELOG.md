# Changelog

All notable changes to `@sigx/live-code` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.8.0] - 2026-08-04

### Changed

- **Aligned with SignalX core 0.15** ([#77](https://github.com/signalxjs/live-code/issues/77)). The pnpm catalog moves `sigx` and `@sigx/vite` to `^0.15.0`, and the tier-1 sibling peers follow the versions just published (each one minor up):
  - `sigx`, `@sigx/vite` (catalog): `^0.14.0` → `^0.15.0`
  - `@sigx/monaco-editor`: dev `^0.6.0` → `^0.7.0`, peer `>=0.6.0 <0.7.0` → `>=0.7.0 <0.8.0`
  - `@sigx/router`: `>=0.11.0 <0.12.0` → `>=0.12.0 <0.13.0`
  - `@sigx/store`: `>=0.12.0 <0.13.0` → `>=0.13.0 <0.14.0`
  - `@sigx/daisyui`: `>=0.11.0 <0.12.0` → `>=0.12.0 <0.13.0`

  No source changes: the runtime binds only stable core primitives (`component`, `signal`, `onMounted`, `onUnmounted`, `render`).

- **Regenerated the playground IntelliSense snapshot against core 0.15** ([#80](https://github.com/signalxjs/live-code/issues/80)). `src/types/generated-modules.ts` — the bundled type snapshot Monaco uses to typecheck playground snippets — now reflects the core 0.15 public surface.

  What moved, and why it matters in the playground:
  - `AsyncState` and `AsyncAction` become discriminated unions (`AsyncIdle` / `AsyncPending` / `AsyncReady` / `AsyncRefreshing` / `AsyncErrored`, plus the `ValuePresence` pair) — `if (x.hasValue) x.value` and `if (x.state === 'ready') x.value` now narrow to `T` in snippets instead of leaving `T | null`.
  - The `error` match arm changed shape: `(e, retry, stale)` → `(e, ctx)` where `ctx` is `ErrorArmContext<T>` (`retry` plus the surviving last-good as `value`/`hasValue`). A snippet still destructuring the old positional `retry`/`stale` arguments is now correctly an error.
  - Declared slots are enforced on both sides: a component's `children` is checked against its declared `default` slot (`SlotChildren` / `SlotContent` / `DefaultFill`), and a scoped slot's accessor requires its props — `slots.x?.()` on a scoped slot is a type error. The daisyui section's `children` prop types expand accordingly.
  - `getCurrentInstance()` is typed (`ComponentSetupContext | null` instead of `any`), and server-fn stable keys read `<stableId>/<name>` (previously `#`-separated).

## [0.7.0] - 2026-07-31

### Changed

- **Aligned with SignalX core 0.14** ([#69](https://github.com/signalxjs/live-code/issues/69)). The pnpm catalog moves `sigx` and `@sigx/vite` to `^0.14.0`, and the tier-1 sibling peers follow the versions just published:
  - `sigx`, `@sigx/vite` (catalog): `^0.13.0` → `^0.14.0`
  - `@sigx/monaco-editor`: dev `^0.5.0` → `^0.6.0`, peer `>=0.5.0 <0.6.0` → `>=0.6.0 <0.7.0`
  - `@sigx/router`: `>=0.10.0 <0.11.0` → `>=0.11.0 <0.12.0`
  - `@sigx/store`: `>=0.10.0 <0.11.0` → `>=0.12.0 <0.13.0` (two minors — store shipped 0.11.0 in the previous cycle and 0.12.0 in this one)
  - `@sigx/daisyui`: `>=0.10.0 <0.11.0` → `>=0.11.0 <0.12.0`

  No source changes: the runtime binds only stable core primitives (`component`, `signal`, `onMounted`, `onUnmounted`, `render`).

- **Regenerated the playground IntelliSense snapshot against core 0.14** ([#71](https://github.com/signalxjs/live-code/issues/71)). `src/types/generated-modules.ts` — the bundled type snapshot Monaco uses to typecheck playground snippets — now reflects the core 0.14 public surface. Without this the peer bump alone would ship 0.13-era completions against a 0.14 runtime: code that typechecks green in the editor and fails at runtime.

  What moved, and why it matters in the playground:
  - `mergeProps` and its `MergeSource` type are now offered.
  - `Define.Attrs` / `Define.WithAttrs` and the `ComponentAttributes` interface appear, and `JSX.IntrinsicAttributes` correspondingly **loses** `id`, `class`, `style` and the `data-*` / `aria-*` index signatures — host attributes on a component are an opt-in in 0.14, so a snippet passing them to a component that never declared them is now correctly an error.
  - `AsyncState` gains `hasValue`, and the `ready` arm is no longer described as the route to a non-null `T` (a nullable value legitimately reaches `ready`).

## [0.6.0] - 2026-07-23

### Changed

- **Aligned with SignalX core 0.13** ([#64](https://github.com/signalxjs/live-code/issues/64)). The pnpm catalog moves `sigx` and `@sigx/vite` to `^0.13.0`, and the tier-1 sibling peers follow the versions just published (each one minor up):
  - `sigx`, `@sigx/vite` (catalog): `^0.12.0` → `^0.13.0`
  - `@sigx/monaco-editor`: dev `^0.4.0` → `^0.5.0`, peer `>=0.4.0 <0.5.0` → `>=0.5.0 <0.6.0`
  - `@sigx/router`: `>=0.9.0 <0.10.0` → `>=0.10.0 <0.11.0`
  - `@sigx/store`: `>=0.9.0 <0.10.0` → `>=0.10.0 <0.11.0`
  - `@sigx/daisyui`: `>=0.9.0 <0.10.0` → `>=0.10.0 <0.11.0`

  No source changes: the runtime binds only stable core primitives (`component`, `signal`, `onMounted`, `onUnmounted`, `render`).

- **Regenerated the playground IntelliSense snapshot against core 0.13** ([#64](https://github.com/signalxjs/live-code/issues/64)). `src/types/generated-modules.ts` — the bundled type snapshot Monaco uses to typecheck playground snippets — now reflects the core 0.13 + satellites 0.10 public surface (e.g. the `defineInjectable` options forms).

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
