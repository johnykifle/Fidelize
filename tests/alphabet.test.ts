import { describe, expect, it } from "vitest";
import { BASES, fidelChar, LATIN_TO_FIDEL, FIDEL_TO_LATIN, VOWEL_SUFFIXES } from "../src/alphabet.js";
import type { VowelOrder } from "../src/alphabet.js";

describe("alphabet table", () => {
  it("has 38 base rows (33 standard + 5 labialized)", () => {
    expect(BASES.length).toBe(38);
    expect(BASES.filter((b) => b.kind === "labialized")).toHaveLength(5);
  });

  it("every base × declared offset produces a single Fidel character", () => {
    for (const base of BASES) {
      const offsets = base.offsets ?? [0, 1, 2, 3, 4, 5, 6];
      for (const offset of offsets) {
        const ch = fidelChar(base, offset as VowelOrder);
        expect([...ch]).toHaveLength(1);
        expect(ch.codePointAt(0)).toBe(base.baseCodepoint + offset);
      }
    }
  });

  it("anchors a few well-known characters", () => {
    expect(fidelChar(BASES.find((b) => b.latin === "s")!, 0)).toBe("ሰ");
    expect(fidelChar(BASES.find((b) => b.latin === "s")!, 3)).toBe("ሳ");
    expect(fidelChar(BASES.find((b) => b.latin === "H")!, 3)).toBe("ሓ");
    expect(fidelChar(BASES.find((b) => b.latin === "T")!, 0)).toBe("ጠ");
    expect(fidelChar(BASES.find((b) => b.latin === "Ts")!, 3)).toBe("ፃ");
    expect(fidelChar(BASES.find((b) => b.latin === "'")!, 3)).toBe("ዓ");
    expect(fidelChar(BASES.find((b) => b.latin === "")!, 3)).toBe("ኣ");
    expect(fidelChar(BASES.find((b) => b.latin === "")!, 5)).toBe("እ");
    expect(fidelChar(BASES.find((b) => b.latin === "kW")!, 3)).toBe("ኳ");
    expect(fidelChar(BASES.find((b) => b.latin === "gW")!, 3)).toBe("ጓ");
    expect(fidelChar(BASES.find((b) => b.latin === "qhW")!, 3)).toBe("ቛ");
  });

  it("LATIN_TO_FIDEL contains expected keys", () => {
    expect(LATIN_TO_FIDEL.get("se")).toBe("ሰ");
    expect(LATIN_TO_FIDEL.get("s")).toBe("ስ");
    expect(LATIN_TO_FIDEL.get("'a")).toBe("ዓ");
    expect(LATIN_TO_FIDEL.get("'")).toBe("ዕ");
    expect(LATIN_TO_FIDEL.get("a")).toBe("ኣ");
    expect(LATIN_TO_FIDEL.get("e")).toBe("አ");
    expect(LATIN_TO_FIDEL.get("I")).toBe("እ");
  });

  it("FIDEL_TO_LATIN round-trips every entry in LATIN_TO_FIDEL", () => {
    for (const [latin, fidel] of LATIN_TO_FIDEL) {
      expect(FIDEL_TO_LATIN.get(fidel)).toBe(latin);
    }
  });

  it("VOWEL_SUFFIXES is the canonical 7-form list", () => {
    expect(VOWEL_SUFFIXES).toEqual(["e", "u", "i", "a", "ie", "", "o"]);
  });
});
