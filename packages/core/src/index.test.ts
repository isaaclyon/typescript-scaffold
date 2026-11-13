import { expect, test } from "vitest";
import { greet } from "./index.ts";

test("greets a person by their capitalized name", () => {
  expect(greet(" ada ")).toBe("Hello, Ada!");
});

test("greets without a name when the name is blank", () => {
  expect(greet("  ")).toBe("Hello!");
});
