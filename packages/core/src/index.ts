import { capitalize } from "./capitalize.ts";

export function greet(name: string): string {
  const trimmed = name.trim();
  return trimmed === "" ? "Hello!" : `Hello, ${capitalize(trimmed)}!`;
}
