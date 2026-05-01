import type { TransliterateOptions } from "./types.js";
import { toFidelStrict } from "./strict.js";
import { toFidelCasual } from "./casual.js";

export function toFidel(input: string, opts: TransliterateOptions = {}): string {
  if (opts.mode === "casual") return toFidelCasual(input, opts);
  return toFidelStrict(input, opts);
}

export { toFidelStrict, toFidelCasual };
