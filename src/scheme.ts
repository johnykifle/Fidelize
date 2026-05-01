import { BASES } from "./alphabet.js";

const cs: string[] = [];
for (const b of BASES) {
  if (b.kind === "consonant" || b.kind === "labialized") cs.push(b.latin);
}
cs.sort((a, b) => b.length - a.length);
export const CONSONANTS_BY_LENGTH: readonly string[] = cs;

export const VOWEL_TOKENS: readonly string[] = ["ie", "e", "u", "i", "a", "o"];

export const STANDALONE_VOWELS: readonly string[] = ["ie", "e", "u", "i", "a", "I", "o"]
  .slice()
  .sort((a, b) => b.length - a.length);

export const AYN_VOWELS: readonly string[] = ["ie", "e", "u", "i", "a", "o"];

export function matchAtStart(input: string, i: number, candidates: readonly string[]): string | null {
  for (const c of candidates) {
    if (input.startsWith(c, i)) return c;
  }
  return null;
}
