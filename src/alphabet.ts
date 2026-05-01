export type VowelOrder = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const VOWEL_SUFFIXES = ["e", "u", "i", "a", "ie", "", "o"] as const;

export interface FidelBase {
  readonly latin: string;
  readonly baseCodepoint: number;
  readonly kind: "consonant" | "vowel" | "ayn" | "labialized";
  /**
   * Codepoint offsets from `baseCodepoint` that this row populates. Defaults
   * to [0..6] (a full 7-form row). Labialized rows omit the u (1) and o (6)
   * positions because Unicode does not allocate them.
   */
  readonly offsets?: readonly number[];
  readonly name?: string;
}

const FULL: readonly number[] = [0, 1, 2, 3, 4, 5, 6];
const LABIALIZED: readonly number[] = [0, 2, 3, 4, 5];

export const BASES: readonly FidelBase[] = [
  { latin: "h",   baseCodepoint: 0x1200, kind: "consonant", name: "he"    },
  { latin: "l",   baseCodepoint: 0x1208, kind: "consonant", name: "le"    },
  { latin: "H",   baseCodepoint: 0x1210, kind: "consonant", name: "Hawi"  },
  { latin: "m",   baseCodepoint: 0x1218, kind: "consonant", name: "me"    },
  { latin: "r",   baseCodepoint: 0x1228, kind: "consonant", name: "re"    },
  { latin: "s",   baseCodepoint: 0x1230, kind: "consonant", name: "se"    },
  { latin: "sh",  baseCodepoint: 0x1238, kind: "consonant", name: "she"   },
  { latin: "q",   baseCodepoint: 0x1240, kind: "consonant", name: "qe"    },
  { latin: "qW",  baseCodepoint: 0x1248, kind: "labialized", offsets: LABIALIZED, name: "qWa-row" },
  { latin: "qh",  baseCodepoint: 0x1250, kind: "consonant", name: "qhe"   },
  { latin: "qhW", baseCodepoint: 0x1258, kind: "labialized", offsets: LABIALIZED, name: "qhWa-row" },
  { latin: "b",   baseCodepoint: 0x1260, kind: "consonant", name: "be"    },
  { latin: "v",   baseCodepoint: 0x1268, kind: "consonant", name: "ve"    },
  { latin: "t",   baseCodepoint: 0x1270, kind: "consonant", name: "te"    },
  { latin: "ch",  baseCodepoint: 0x1278, kind: "consonant", name: "che"   },
  { latin: "n",   baseCodepoint: 0x1290, kind: "consonant", name: "ne"    },
  { latin: "ny",  baseCodepoint: 0x1298, kind: "consonant", name: "nye"   },
  { latin: "",    baseCodepoint: 0x12A0, kind: "vowel",     name: "vowel-base" },
  { latin: "k",   baseCodepoint: 0x12A8, kind: "consonant", name: "ke"    },
  { latin: "kW",  baseCodepoint: 0x12B0, kind: "labialized", offsets: LABIALIZED, name: "kWa-row" },
  { latin: "kh",  baseCodepoint: 0x12B8, kind: "consonant", name: "khe"   },
  { latin: "khW", baseCodepoint: 0x12C0, kind: "labialized", offsets: LABIALIZED, name: "khWa-row" },
  { latin: "w",   baseCodepoint: 0x12C8, kind: "consonant", name: "we"    },
  { latin: "'",   baseCodepoint: 0x12D0, kind: "ayn",       name: "ayn"   },
  { latin: "z",   baseCodepoint: 0x12D8, kind: "consonant", name: "ze"    },
  { latin: "zh",  baseCodepoint: 0x12E0, kind: "consonant", name: "zhe"   },
  { latin: "y",   baseCodepoint: 0x12E8, kind: "consonant", name: "ye"    },
  { latin: "d",   baseCodepoint: 0x12F0, kind: "consonant", name: "de"    },
  { latin: "j",   baseCodepoint: 0x1300, kind: "consonant", name: "je"    },
  { latin: "g",   baseCodepoint: 0x1308, kind: "consonant", name: "ge"    },
  { latin: "gW",  baseCodepoint: 0x1310, kind: "labialized", offsets: LABIALIZED, name: "gWa-row" },
  { latin: "T",   baseCodepoint: 0x1320, kind: "consonant", name: "Te"    },
  { latin: "Ch",  baseCodepoint: 0x1328, kind: "consonant", name: "Che"   },
  { latin: "P",   baseCodepoint: 0x1330, kind: "consonant", name: "Pe"    },
  { latin: "ts",  baseCodepoint: 0x1338, kind: "consonant", name: "tse"   },
  { latin: "Ts",  baseCodepoint: 0x1340, kind: "consonant", name: "Tse"   },
  { latin: "f",   baseCodepoint: 0x1348, kind: "consonant", name: "fe"    },
  { latin: "p",   baseCodepoint: 0x1350, kind: "consonant", name: "pe"    },
];

export function fidelChar(base: FidelBase, order: VowelOrder): string {
  return String.fromCodePoint(base.baseCodepoint + order);
}

// Vowel-base row uses the vowel itself as the key. The 6th order እ is reached
// via the literal marker "I" (capital i) in the strict scheme, since "i" is
// already the 3rd-order ኢ. This is the only standalone vowel form that is not
// directly typed as one of e/u/i/a/ie/o.
const VOWEL_BASE_KEYS: readonly string[] = ["e", "u", "i", "a", "ie", "I", "o"];

const _latinToFidel = new Map<string, string>();
const _fidelToLatin = new Map<string, string>();

for (const base of BASES) {
  const offsets = base.offsets ?? FULL;
  for (const offset of offsets) {
    const vowel = VOWEL_SUFFIXES[offset] ?? "";
    const fidel = String.fromCodePoint(base.baseCodepoint + offset);

    let key: string;
    if (base.kind === "vowel") {
      key = VOWEL_BASE_KEYS[offset] ?? "";
    } else if (base.kind === "ayn") {
      // 6th order is the bare apostrophe; others are "'" + vowel.
      key = offset === 5 ? "'" : "'" + vowel;
    } else {
      // consonants and labialized: "<latin><vowel>", offset 5 = bare.
      key = base.latin + vowel;
    }

    if (key !== "" && !_latinToFidel.has(key)) {
      _latinToFidel.set(key, fidel);
    }
    if (!_fidelToLatin.has(fidel)) {
      _fidelToLatin.set(fidel, key);
    }
  }
}

export const LATIN_TO_FIDEL: ReadonlyMap<string, string> = _latinToFidel;
export const FIDEL_TO_LATIN: ReadonlyMap<string, string> = _fidelToLatin;
