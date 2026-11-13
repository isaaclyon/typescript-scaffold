# Agent guide

This file must stay at 100 lines or fewer. `CLAUDE.md` is a symlink to it.

## Commands

- `pnpm install` installs dependencies and turns on the git hook.
- `pnpm check` runs every check: format, lint, types, and tests with coverage.
  Work is done only when it passes.
- `pnpm format` fixes formatting.
- `pnpm vitest run <path>` runs one test file.

## Layout

- `packages/<name>/` holds one package. Its name is `@repo/<name>`.
- `packages/<name>/src/index.ts` is the package's only public entry point.
- `tests/architecture/` holds the tests that enforce the rules below.

## Rules

- Import another package by its name, such as `@repo/core`. Never import its
  files by path. Everything `src/index.ts` does not export is private.
- Declare a dependency in the `package.json` of the package that uses it.
- No circular imports.
- Write relative imports with the `.ts` extension.
- Put a test next to the code it tests, named `<file>.test.ts`.
- Use only TypeScript syntax that Node can strip. That excludes `enum`,
  `namespace` and constructor parameter properties.

## Limits

- Coverage: 80% of lines, functions, branches and statements.
- Source files: 300 lines, not counting blank lines and comments.
- Markdown files: 300 lines. This file: 100 lines.

## No build step

Node 24 runs TypeScript files directly, so packages export their source.
Add a build only when a package must be published.

## Adding a package

1. Create `packages/<name>/` with a `package.json` copied from `packages/core/`.
2. Add `README.md`, `src/index.ts` and at least one test.
3. Run `pnpm install`.

## Secrets

Never commit secrets. A pre-commit hook runs Gitleaks on staged changes.
