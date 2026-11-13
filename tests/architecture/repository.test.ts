import { existsSync, globSync, readFileSync, readlinkSync } from "node:fs";
import { expect, test } from "vitest";

function lineCount(path: string): number {
  return readFileSync(path, "utf8").trimEnd().split("\n").length;
}

test("AGENTS.md has at most 100 lines", () => {
  expect(lineCount("AGENTS.md")).toBeLessThanOrEqual(100);
});

test("Markdown files have at most 300 lines", () => {
  const files = globSync("**/*.md", {
    exclude: (name) => name === "node_modules",
  });
  expect(files.filter((file) => lineCount(file) > 300)).toEqual([]);
});

test("CLAUDE.md is a symlink to AGENTS.md", () => {
  expect(readlinkSync("CLAUDE.md")).toBe("AGENTS.md");
});

test.each(globSync("packages/*"))(
  "%s has a README, an entry point and a test",
  (dir) => {
    expect(existsSync(`${dir}/README.md`)).toBe(true);
    expect(existsSync(`${dir}/src/index.ts`)).toBe(true);
    expect(globSync(`${dir}/src/**/*.test.ts`)).not.toEqual([]);
  },
);
