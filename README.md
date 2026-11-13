# typescript-scaffold

A starting point for a TypeScript repository with strict types, linting,
formatting, tests with coverage limits, and tests that enforce package
boundaries.

## Requirements

- Node 24
- pnpm 12
- [Gitleaks](https://github.com/gitleaks/gitleaks), for the pre-commit secret
  scan: `brew install gitleaks`

## Getting started

```sh
pnpm install
pnpm check
```

`pnpm check` runs the format check, lint, type check and tests with coverage.
CI runs the same command.

## What is enforced

| Rule                                                      | Enforced by                             |
| --------------------------------------------------------- | --------------------------------------- |
| Strict typing                                             | `tsconfig.json`                         |
| Lint rules and a 300-line limit on source files           | `eslint.config.js`                      |
| Formatting                                                | Prettier defaults                       |
| 80% test coverage                                         | `vitest.config.ts`                      |
| Packages import each other only through `src/index.ts`    | `tests/architecture/imports.test.ts`    |
| No circular imports, no undeclared dependencies           | `tests/architecture/imports.test.ts`    |
| No test-only dependencies in production code              | `tests/architecture/imports.test.ts`    |
| `AGENTS.md` at most 100 lines, other Markdown at most 300 | `tests/architecture/repository.test.ts` |
| Every package has a README, an entry point and a test     | `tests/architecture/repository.test.ts` |
| No secrets in commits                                     | `.githooks/pre-commit` and CI           |

See [AGENTS.md](AGENTS.md) for the layout and the rules.
