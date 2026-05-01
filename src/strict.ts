import { LATIN_TO_FIDEL } from "./alphabet.js";
import { CONSONANTS_BY_LENGTH, VOWEL_TOKENS, AYN_VOWELS, matchAtStart } from "./scheme.js";
import { asciiPunctAt } from "./punctuation.js";
import type { TransliterateOptions } from "./types.js";

const STANDALONE_VOWELS_ORDERED = ["ie", "e", "u", "i", "a", "o"] as const;

export function toFidelStrict(input: string, opts: TransliterateOptions = {}): string {
  const usePunct = opts.punctuation !== false;
  let out = "";
  let i = 0;
  const n = input.length;

  while (i < n) {
    const ch = input[i]!;

    if (ch === "'") {
      const vowel = matchAtStart(input, i + 1, AYN_VOWELS);
      const key = vowel ? "'" + vowel : "'";
      const fidel = LATIN_TO_FIDEL.get(key);
      if (fidel !== undefined) {
        out += fidel;
        i += 1 + (vowel?.length ?? 0);
        continue;
      }
      out += ch;
      i += 1;
      continue;
    }

    if (ch === "I") {
      const fidel = LATIN_TO_FIDEL.get("I");
      if (fidel !== undefined) {
        out += fidel;
        i += 1;
        continue;
      }
    }

    const consonant = matchAtStart(input, i, CONSONANTS_BY_LENGTH);
    if (consonant !== null) {
      const after = i + consonant.length;
      const vowel = matchAtStart(input, after, VOWEL_TOKENS);
      const key = consonant + (vowel ?? "");
      const fidel = LATIN_TO_FIDEL.get(key);
      if (fidel !== undefined) {
        out += fidel;
        i = after + (vowel?.length ?? 0);
        continue;
      }
      out += LATIN_TO_FIDEL.get(consonant) ?? consonant;
      i = after;
      continue;
    }

    const sv = matchAtStart(input, i, STANDALONE_VOWELS_ORDERED);
    if (sv !== null) {
      const fidel = LATIN_TO_FIDEL.get(sv);
      if (fidel !== undefined) {
        out += fidel;
        i += sv.length;
        continue;
      }
    }

    if (usePunct) {
      const p = asciiPunctAt(input, i);
      if (p !== null) {
        out += p.replacement;
        i += p.token.length;
        continue;
      }
    }

    out += ch;
    i += 1;
  }

  return out;
}
