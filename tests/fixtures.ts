export const STRICT_PAIRS: ReadonlyArray<readonly [string, string]> = [
  // canonical example from the README
  ["ab tHti 'arat", "ኣብ ትሕቲ ዓራት"],

  // basic CV
  ["selam", "ሰላም"],
  ["se", "ሰ"],
  ["sa", "ሳ"],
  ["si", "ሲ"],
  ["su", "ሱ"],
  ["sie", "ሴ"],
  ["s", "ስ"],
  ["so", "ሶ"],

  // 6th-order bare consonants in a word
  ["ngsti", "ንግስቲ"],

  // hard h (Hawi row)
  ["Hawi", "ሓዊ"],
  ["He", "ሐ"],
  ["Ho", "ሖ"],
  ["H", "ሕ"],

  // emphatics
  ["Tena", "ጠና"],
  ["Pe", "ጰ"],
  ["Cha", "ጫ"],
  ["Tsa", "ፃ"],

  // multi-char consonants
  ["sha", "ሻ"],
  ["cha", "ቻ"],
  ["tsa", "ጻ"],
  ["kha", "ኻ"],
  ["qha", "ቓ"],
  ["nya", "ኛ"],
  ["zha", "ዣ"],

  // ayn series
  ["'arat", "ዓራት"],
  ["'alem", "ዓለም"],
  ["'", "ዕ"],
  ["'e", "ዐ"],

  // standalone vowels
  ["a", "ኣ"],
  ["e", "አ"],
  ["i", "ኢ"],
  ["u", "ኡ"],
  ["o", "ኦ"],
  ["ie", "ኤ"],
  ["I", "እ"],

  // labialized rows: kW, khW, qW, qhW, gW (5 forms each: e, i, a, ie, bare)
  ["kWe", "ኰ"], ["kWi", "ኲ"], ["kWa", "ኳ"], ["kWie", "ኴ"], ["kW", "ኵ"],
  ["khWe", "ዀ"], ["khWi", "ዂ"], ["khWa", "ዃ"], ["khWie", "ዄ"], ["khW", "ዅ"],
  ["qWe", "ቈ"], ["qWi", "ቊ"], ["qWa", "ቋ"], ["qWie", "ቌ"], ["qW", "ቍ"],
  ["qhWe", "ቘ"], ["qhWi", "ቚ"], ["qhWa", "ቛ"], ["qhWie", "ቜ"], ["qhW", "ቝ"],
  ["gWe", "ጐ"], ["gWi", "ጒ"], ["gWa", "ጓ"], ["gWie", "ጔ"], ["gW", "ጕ"],

  // labialized in context
  ["gWal", "ጓል"],
  ["qWanqWa", "ቋንቋ"],

  // mixed text (passthrough)
  ["selam 1234", "ሰላም 1234"],

  // round-trip-friendly full sentence
  ["selam 'alem", "ሰላም ዓለም"],
];

export const CASUAL_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["ab tahti arat", "ኣብ ትሕቲ ዓራት"],
  ["selam alem", "ሰላም ዓለም"],
  ["selam, kemey aleka", "ሰላም፣ ከመይ ኣለካ"], // "aleka" not in dictionary -> strict fallback
  ["hade klte seleste", "ሓደ ክልተ ሰለስተ"],
];
