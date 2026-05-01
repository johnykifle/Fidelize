import { FIDEL_TO_LATIN } from "./alphabet.js";
import { ETHIOPIC_TO_ASCII } from "./punctuation.js";
import type { TransliterateOptions } from "./types.js";

export function toLatin(input: string, opts: TransliterateOptions = {}): string {
  const usePunct = opts.punctuation !== false;
  let out = "";

  for (const ch of input) {
    const lat = FIDEL_TO_LATIN.get(ch);
    if (lat !== undefined) {
      out += lat;
      continue;
    }
    if (usePunct) {
      const punct = ETHIOPIC_TO_ASCII.get(ch);
      if (punct !== undefined) {
        out += punct;
        continue;
      }
    }
    out += ch;
  }

  return out;
}
