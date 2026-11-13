import { expect, test } from "vitest";
import { greetAll } from "./index.ts";

test("greets each person on their own line", () => {
  expect(greetAll(["ada", "grace"])).toBe("Hello, Ada!\nHello, Grace!");
});
