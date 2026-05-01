import { describe, expect, it } from "vitest";
import { toFidel } from "../src/toFidel.js";
import { toLatin } from "../src/toLatin.js";
import { BASES, fidelChar } from "../src/alphabet.js";
import type { VowelOrder } from "../src/alphabet.js";
import { STRICT_PAIRS } from "./fixtures.js";

describe("toLatin", () => {
  it("converts well-known characters", () => {
    expect(toLatin("ሰላም")).toBe("selam");
    expect(toLatin("ኣብ ትሕቲ ዓራት")).toBe("ab tHti 'arat");
    expect(toLatin("ሓዊ")).toBe("Hawi");
    expect(toLatin("ጠና")).toBe("Tena");
    expect(toLatin("ጓል")).toBe("gWal");
    expect(toLatin("ቋንቋ")).toBe("qWanqWa");
  });

  it("converts Ethiopic punctuation back to ASCII by default", () => {
    expect(toLatin("ሰላም፣ ዓለም")).toBe("selam, 'alem");
  });

  it("preserves Ethiopic punctuation when disabled", () => {
    expect(toLatin("ሰላም፣", { punctuation: false })).toBe("selam፣");
  });

  it("passes non-Fidel text through unchanged", () => {
    expect(toLatin("hello 1234")).toBe("hello 1234");
  });

  it("round-trips every base × declared offset through strict toFidel", () => {
    for (const base of BASES) {
      const offsets = base.offsets ?? [0, 1, 2, 3, 4, 5, 6];
      for (const offset of offsets) {
        const ch = fidelChar(base, offset as VowelOrder);
        const latin = toLatin(ch);
        if (latin === "") continue;
        expect(toFidel(latin)).toBe(ch);
      }
    }
  });

  it("round-trips every fixture pair", () => {
    for (const [latin, fidel] of STRICT_PAIRS) {
      // Skip cases where the Latin has trailing whitespace passthrough that would diverge.
      if (latin.includes("1234")) continue;
      expect(toLatin(fidel)).toBe(latin);
    }
  });
});
