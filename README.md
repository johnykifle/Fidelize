# Fidelize

Reliable, deterministic transliteration between Latin (romanized) Tigrinya and the Fidel (Geʽez) script for TypeScript / JavaScript.

Tigrinya (ትግርኛ) is spoken by millions in **Eritrea** (where it is one of the working languages) and in the **Tigray region of Ethiopia**. This library is built for developers serving either community.

```ts
import { toFidel, toLatin } from "@johnykifle/fidelize";

toFidel("ab tHti 'arat");                       // → "ኣብ ትሕቲ ዓራት"
toFidel("ab tahti arat", { mode: "casual" });   // → "ኣብ ትሕቲ ዓራት"
toLatin("ሰላም ዓለም");                            // → "selam 'alem"
```

## Why two modes?

A casual lowercase romanization like `"ab tahti arat"` is ambiguous — `a` maps to either ኣ or ዓ depending on the word, and `tahti` drops a vowel that strict phonetic parsing would preserve. So this library exposes two modes:

- **`strict`** (default): a deterministic, case-sensitive scheme. Uppercase letters mark hard / emphatic consonants and `'` marks the ayn series. Every input string maps to exactly one Fidel string.
- **`casual`**: lowercase-only. Looks up tokens in a dictionary of common Tigrinya words first; falls back to strict parsing for unknown tokens.

For programmatic use (search indexing, IME backends, normalization), use `strict`. For free-form user input, `casual` is more forgiving but only as accurate as its dictionary.

## Strict scheme reference

### Vowel orders

| Order | Suffix | `s` row | sound |
|-------|--------|---------|-------|
| 1     | `e`    | `se` → ሰ | sä   |
| 2     | `u`    | `su` → ሱ | su   |
| 3     | `i`    | `si` → ሲ | si   |
| 4     | `a`    | `sa` → ሳ | sa   |
| 5     | `ie`   | `sie` → ሴ | sē  |
| 6     | (none) | `s` → ስ  | sɨ / silent |
| 7     | `o`    | `so` → ሶ | so   |

### Consonants (lowercase = soft, uppercase = hard / emphatic)

| Latin | Fidel | | Latin | Fidel | | Latin | Fidel |
|---|---|---|---|---|---|---|---|
| `h`  | ሀ | | `n`  | ነ | | `T`  | ጠ |
| `l`  | ለ | | `ny` | ኘ | | `Ch` | ጨ |
| `H`  | ሐ | | `k`  | ከ | | `P`  | ጰ |
| `m`  | መ | | `kh` | ኸ | | `ts` | ጸ |
| `r`  | ረ | | `w`  | ወ | | `Ts` | ፀ |
| `s`  | ሰ | | `z`  | ዘ | | `f`  | ፈ |
| `sh` | ሸ | | `zh` | ዠ | | `p`  | ፐ |
| `q`  | ቀ | | `y`  | የ | | `v`  | ቨ |
| `qh` | ቐ | | `d`  | ደ | |       |    |
| `b`  | በ | | `j`  | ጀ | |       |    |
| `t`  | ተ | | `g`  | ገ | |       |    |
| `ch` | ቸ | |       |    | |       |    |

### Standalone vowels (no preceding consonant)

| Latin | Fidel | Latin | Fidel |
|---|---|---|---|
| `e`  | አ | `a`  | ኣ |
| `u`  | ኡ | `ie` | ኤ |
| `i`  | ኢ | `o`  | ኦ |
| `I`  | እ |       |    |

### Labialized series (suffix `W` on the consonant)

Five rows, each with five forms (no `u`, no `o`):

| Latin   | e | i | a | ie | bare |
|---------|---|---|---|----|------|
| `kW…`   | ኰ | ኲ | ኳ | ኴ  | ኵ    |
| `khW…`  | ዀ | ዂ | ዃ | ዄ  | ዅ    |
| `qW…`   | ቈ | ቊ | ቋ | ቌ  | ቍ    |
| `qhW…`  | ቘ | ቚ | ቛ | ቜ  | ቝ    |
| `gW…`   | ጐ | ጒ | ጓ | ጔ  | ጕ    |

`kWa`→ኳ, `gWal`→ጓል, `qWanqWa`→ቋንቋ.

### Ayn series (prefix `'`)

| Latin | Fidel | Latin | Fidel |
|---|---|---|---|
| `'e`  | ዐ | `'a`  | ዓ |
| `'u`  | ዑ | `'ie` | ዔ |
| `'i`  | ዒ | `'`   | ዕ |
|       |    | `'o`  | ዖ |

### Punctuation (default on; pass `{ punctuation: false }` to disable)

| ASCII | Fidel |
|---|---|
| `..` | ። |
| `,`  | ፣ |
| `;`  | ፤ |

## API

```ts
function toFidel(input: string, opts?: TransliterateOptions): string;
function toLatin(input: string, opts?: TransliterateOptions): string;

interface TransliterateOptions {
  mode?: "strict" | "casual";  // default: "strict"
  punctuation?: boolean;        // default: true
}
```

The library also re-exports the underlying alphabet table:

```ts
import { BASES, LATIN_TO_FIDEL, FIDEL_TO_LATIN, fidelChar } from "@johnykifle/fidelize";
```

## CLI

Install globally (provides a `fidelize` command):

```sh
npm i -g @johnykifle/fidelize
fidelize "ab tHti 'arat"           # ኣብ ትሕቲ ዓራት
fidelize --casual "ab tahti arat"  # ኣብ ትሕቲ ዓራት
fidelize --reverse "ሰላም"           # selam
echo "selam" | fidelize
```

Or run ad-hoc with `npx`:

```sh
npx @johnykifle/fidelize "ab tHti 'arat"
```

## Casual-mode dictionary

`COMMON_WORDS` is a plain `Record<string, string>` keyed by lowercase Latin. To add coverage:

```ts
import { COMMON_WORDS } from "@johnykifle/fidelize";
const myDict = { ...COMMON_WORDS, "newword": "ሓዲሽ ቃል" };
```

Open a PR if you'd like a word added to the bundled dictionary.

## Building from source

```sh
npm install
npm run build      # tsup -> dist/{index.js,index.cjs,index.d.ts,cli.js}
npm test           # vitest
npm run demo       # builds and serves demo/index.html
```

## License

MIT
