# Contributing to @sigx/live-code

Thanks for your interest! This repo ships [`@sigx/live-code`](./packages/live-code) — interactive live-code blocks for sigx documentation, powered by [`@sigx/monaco-editor`](https://github.com/signalxjs/monaco-editor). Other SignalX packages (router, store, UI kit, SSG, docs site) live in their own repositories under [`signalxjs`](https://github.com/signalxjs).

## Prerequisites

- **Node.js** `^20.19.0` or `>=22.12.0`
- **pnpm** `>=10` (this repo uses workspaces; `npm` and `yarn` are not supported)

## Getting started

```bash
git clone https://github.com/signalxjs/live-code.git
cd live-code
pnpm install
pnpm build
```

`pnpm build` regenerates `packages/live-code/src/types/generated-modules.ts` (sigx ambient types consumed by the in-browser Monaco editor) and produces the library bundle under `packages/live-code/dist/`.

## Common tasks

| Task | Command |
|---|---|
| Build the library | `pnpm build` |
| Lint | `pnpm lint` |
| Typecheck | `pnpm typecheck` |
| Run tests | `pnpm test` |
| Verify pack shape | `pnpm verify:pack` |
| Bundle-size budget | `pnpm size` |

## Pre-push checklist

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
pnpm verify:pack
```

## Pull request guidelines

- **Keep PRs small and focused.** One logical change per PR.
- **Reference an issue** if one exists; otherwise describe the motivation in the PR body.
- **Add tests** for new behaviour or bug fixes.
- **Don't bump versions** in your PR — release versioning is handled centrally via the `pnpm version:*` scripts.

## Releasing (maintainers)

Releases are automated via GitHub Actions and npm trusted publishing (OIDC) — no `NPM_TOKEN` is needed. The release workflow is triggered by pushing a `v*.*.*` tag.

### One-time setup

1. On npmjs.com, configure **Trusted Publishing** for `@sigx/live-code`, pointing at:
   - Repository: `signalxjs/live-code`
   - Workflow: `release.yml`
   - Environment: _(leave blank)_
2. Confirm GitHub repo permissions allow `id-token: write` for the `release.yml` workflow (already declared at the job level).

### Cutting a release

```bash
# 1. Make sure main is green and your working tree is clean.
git checkout main && git pull

# 2. Bump the version (this updates package.json and creates a tag).
pnpm version:patch    # or version:minor / version:major
#   ↳ writes vX.Y.Z and a matching git tag locally

# 3. Push the tag — this triggers .github/workflows/release.yml
git push --follow-tags
```

The `Release` workflow then runs:

1. `pnpm install --frozen-lockfile`
2. `pnpm lint` / `typecheck` / `build` / `test` / `verify:pack`
3. `node scripts/publish.js` — publishes to npm with provenance via OIDC, skipping any package whose current version is already on the registry
4. Creates (or promotes) the matching GitHub Release with auto-generated notes

### Local dry-run

Before tagging, you can sanity-check the publish flow locally:

```bash
pnpm publish:dry      # runs `pnpm pack --dry-run` per workspace package
pnpm verify:pack      # asserts the produced tarball has the expected shape
```

### Beta / pre-release

```bash
pnpm version:set 0.2.0-beta.0
git push --follow-tags
# Or, to publish without tagging:
pnpm publish:beta
```

### Troubleshooting

- **`ERR_PNPM_NO_MATCHING_VERSION` for `@sigx/monaco-editor`** — the peer dep must be published to npm before `@sigx/live-code` can be installed by consumers. Bump and publish [`signalxjs/monaco-editor`](https://github.com/signalxjs/monaco-editor) first.
- **OIDC publish fails with `403`** — check that the npm Trusted Publishing config still matches the repo + workflow filename.
- **`verify:pack` complains about missing files** — ensure `pnpm build` ran first; the `files` field in `packages/live-code/package.json` only ships `dist/`, `src/`, and `README.md`.

## Reporting bugs and requesting features

- **Bug?** Open an issue with the [bug report template](https://github.com/signalxjs/live-code/issues/new?template=bug_report.yml). A minimal reproduction (StackBlitz or a small repo) helps a lot.
- **Feature idea?** Use the [feature request template](https://github.com/signalxjs/live-code/issues/new?template=feature_request.yml). API sketches welcome.

## Code of conduct

This project follows the [Contributor Covenant](./CODE_OF_CONDUCT.md). Be kind.

## License

By contributing, you agree that your contributions will be licensed under the MIT License (see [LICENSE](./LICENSE)).

- **Bug?** Open an issue with the [bug report template](https://github.com/signalxjs/live-code/issues/new?template=bug_report.yml). A minimal reproduction (StackBlitz or a small repo) helps a lot.
- **Feature idea?** Use the [feature request template](https://github.com/signalxjs/live-code/issues/new?template=feature_request.yml). API sketches welcome.

## Code of conduct

This project follows the [Contributor Covenant](./CODE_OF_CONDUCT.md). Be kind.

## License

By contributing, you agree that your contributions will be licensed under the MIT License (see [LICENSE](./LICENSE)).
