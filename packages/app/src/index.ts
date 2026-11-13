import { greet } from "@repo/core";

export function greetAll(names: readonly string[]): string {
  return names.map(greet).join("\n");
}
