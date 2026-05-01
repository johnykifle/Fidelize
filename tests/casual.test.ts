import { describe, expect, it } from "vitest";
import { toFidel } from "../src/toFidel.js";
import { CASUAL_PAIRS } from "./fixtures.js";

describe("toFidel (casual mode)", () => {
  for (const [input, expected] of CASUAL_PAIRS) {
    it(`${JSON.stringify(input)} -> ${JSON.stringify(expected)}`, () => {
      expect(toFidel(input, { mode: "casual" })).toBe(expected);
    });
  }

  it("falls back to strict parsing when a token is not in the dictionary", () => {
    // "selama" is not in the dictionary; strict parses it lowercased: s+e + l+a + m+a
    expect(toFidel("selama", { mode: "casual" })).toBe("ሰላማ");
  });

  it("dictionary handles ambiguity that strict cannot", () => {
    // Strict interpretation of lowercase "arat" would be ኣራት (a + ra + t).
    // Casual mode looks it up and gets the correct ዓራት instead.
    const strict = toFidel("arat");
    const casual = toFidel("arat", { mode: "casual" });
    expect(strict).toBe("ኣራት");
    expect(casual).toBe("ዓራት");
  });

  it("never throws on arbitrary input", () => {
    expect(() => toFidel("xyzzy 1234 !!!", { mode: "casual" })).not.toThrow();
  });
});
