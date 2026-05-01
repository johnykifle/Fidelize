// ASCII <-> Ethiopic punctuation. Conservative defaults: only the unambiguous
// cases. ".." -> ። avoids clobbering single-period sentence endings that
// callers may already control.

export const ASCII_TO_ETHIOPIC: ReadonlyMap<string, string> = new Map([
  ["..", "።"],
  [",", "፣"],
  [";", "፤"],
]);

export const ETHIOPIC_TO_ASCII: ReadonlyMap<string, string> = new Map([
  ["።", "."],
  ["፣", ","],
  ["፤", ";"],
  ["፥", ":"],
  ["፦", ":-"],
  ["፧", "?"],
  ["፨", "¶"],
  ["፡", " "],
]);

export function asciiPunctAt(input: string, i: number): { token: string; replacement: string } | null {
  const two = input.slice(i, i + 2);
  const oneRep = ASCII_TO_ETHIOPIC.get(two);
  if (oneRep !== undefined) return { token: two, replacement: oneRep };
  const one = input[i];
  if (one !== undefined) {
    const rep = ASCII_TO_ETHIOPIC.get(one);
    if (rep !== undefined) return { token: one, replacement: rep };
  }
  return null;
}
