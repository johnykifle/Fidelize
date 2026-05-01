import { COMMON_WORDS } from "./dictionary.js";
import { toFidelStrict } from "./strict.js";
import type { TransliterateOptions } from "./types.js";

const WORD_RUN = /[A-Za-z']+/g;

export function toFidelCasual(input: string, opts: TransliterateOptions = {}): string {
  let out = "";
  let lastIndex = 0;

  for (const m of input.matchAll(WORD_RUN)) {
    const start = m.index ?? 0;
    if (start > lastIndex) {
      out += toFidelStrict(input.slice(lastIndex, start), opts);
    }
    const word = m[0];
    const dictHit = COMMON_WORDS[word.toLowerCase()];
    out += dictHit !== undefined ? dictHit : toFidelStrict(word, opts);
    lastIndex = start + word.length;
  }

  if (lastIndex < input.length) {
    out += toFidelStrict(input.slice(lastIndex), opts);
  }

  return out;
}
