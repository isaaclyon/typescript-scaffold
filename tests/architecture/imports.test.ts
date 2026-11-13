import assert from "node:assert";
import { cruise } from "dependency-cruiser";
import { expect, test } from "vitest";

test("packages follow the import rules", async () => {
  const { output } = await cruise(["packages"], {
    validate: true,
    tsPreCompilationDeps: true,
    combinedDependencies: true,
    doNotFollow: { path: "node_modules" },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "default"],
    },
    ruleSet: {
      forbidden: [
        {
          name: "no-circular-imports",
          severity: "error",
          from: {},
          to: { circular: true },
        },
        {
          name: "no-unresolvable-imports",
          comment: "Declare the dependency in the package's own package.json.",
          severity: "error",
          from: {},
          to: { couldNotResolve: true },
        },
        {
          name: "no-private-imports",
          comment: "Only src/index.ts of another package is public.",
          severity: "error",
          from: { path: "^packages/([^/]+)/" },
          to: {
            path: "^packages/",
            pathNot: ["^packages/$1/", "^packages/[^/]+/src/index\\.ts$"],
          },
        },
        {
          name: "no-relative-imports-across-packages",
          comment: "Import another package by its name, such as @repo/core.",
          severity: "error",
          from: { path: "^packages/([^/]+)/" },
          to: {
            path: "^packages/",
            pathNot: "^packages/$1/",
            dependencyTypes: ["local"],
          },
        },
        {
          name: "no-dev-dependencies-in-production-code",
          severity: "error",
          from: { path: "^packages/", pathNot: "\\.test\\.ts$" },
          to: {
            dependencyTypes: ["npm-dev"],
            dependencyTypesNot: ["type-only"],
          },
        },
      ],
    },
  });
  assert(typeof output !== "string");

  const violations = output.summary.violations.map(
    ({ rule, from, to }) => `${rule.name}: ${from} -> ${to}`,
  );
  expect(violations).toEqual([]);
});
