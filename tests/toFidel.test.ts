import { describe, expect, it } from "vitest";
import { toFidel } from "../src/toFidel.js";
import { STRICT_PAIRS } from "./fixtures.js";

describe("toFidel (strict mode, default)", () => {
  for (const [input, expected] of STRICT_PAIRS) {
    it(`${JSON.stringify(input)} -> ${JSON.stringify(expected)}`, () => {
      expect(toFidel(input)).toBe(expected);
    });
  }

  it("passes empty string through", () => {
    expect(toFidel("")).toBe("");
  });

  it("passes already-Fidel text through unchanged", () => {
    expect(toFidel("ሰላም")).toBe("ሰላም");
  });

  it("preserves whitespace and digits", () => {
    expect(toFidel("hade\t1\n2")).toBe("ሃደ\t1\n2");
  });

  it("converts ASCII punctuation by default", () => {
    expect(toFidel("selam, 'alem")).toBe("ሰላም፣ ዓለም");
  });

  it("leaves ASCII punctuation alone when disabled", () => {
    expect(toFidel("selam, 'alem", { punctuation: false })).toBe("ሰላም, ዓለም");
  });

  it("renders the full ሀ row from a single space-separated input", () => {
    expect(toFidel("he hu hi ha hie h ho")).toBe("ሀ ሁ ሂ ሃ ሄ ህ ሆ");
  });

  it("renders the full ሰ row", () => {
    expect(toFidel("se su si sa sie s so")).toBe("ሰ ሱ ሲ ሳ ሴ ስ ሶ");
  });

  it("renders the full ዐ (ayn) row", () => {
    expect(toFidel("'e 'u 'i 'a 'ie ' 'o")).toBe("ዐ ዑ ዒ ዓ ዔ ዕ ዖ");
  });

  it("greedy match prefers longer consonants (Ts beats T+s)", () => {
    expect(toFidel("Tsa")).toBe("ፃ");
    expect(toFidel("tsa")).toBe("ጻ");
  });

  it("case distinguishes hard/soft consonants", () => {
    expect(toFidel("ha")).toBe("ሃ");
    expect(toFidel("Ha")).toBe("ሓ");
    expect(toFidel("ta")).toBe("ታ");
    expect(toFidel("Ta")).toBe("ጣ");
  });
});
