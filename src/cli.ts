import { toFidel } from "./toFidel.js";
import { toLatin } from "./toLatin.js";
import type { TransliterateOptions } from "./types.js";

interface ParsedArgs {
  reverse: boolean;
  mode: "strict" | "casual";
  noPunct: boolean;
  text: string | null;
  showHelp: boolean;
}

function parseArgs(argv: readonly string[]): ParsedArgs {
  const args: ParsedArgs = {
    reverse: false,
    mode: "strict",
    noPunct: false,
    text: null,
    showHelp: false,
  };
  const positional: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    switch (a) {
      case "-r":
      case "--reverse":
        args.reverse = true;
        break;
      case "-c":
      case "--casual":
        args.mode = "casual";
        break;
      case "--strict":
        args.mode = "strict";
        break;
      case "--no-punct":
        args.noPunct = true;
        break;
      case "-h":
      case "--help":
        args.showHelp = true;
        break;
      default:
        positional.push(a);
    }
  }
  if (positional.length > 0) args.text = positional.join(" ");
  return args;
}

function help(): string {
  return `fidelize - convert between Latin and Tigrinya Fidel script

Usage:
  fidelize [options] "text"
  echo "text" | fidelize [options]

Options:
  -r, --reverse    Convert Fidel -> Latin (default is Latin -> Fidel)
  -c, --casual     Use casual mode (lowercase + dictionary)
      --strict     Use strict mode (default)
      --no-punct   Do not convert punctuation
  -h, --help       Show this help

Examples:
  fidelize "ab tHti 'arat"          # ኣብ ትሕቲ ዓራት
  fidelize --casual "ab tahti arat" # ኣብ ትሕቲ ዓራት
  fidelize --reverse "ሰላም"          # selam`;
}

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if (args.showHelp) {
    process.stdout.write(help() + "\n");
    return;
  }

  let text = args.text;
  if (text === null) {
    if (process.stdin.isTTY) {
      process.stderr.write(help() + "\n");
      process.exit(1);
    }
    text = (await readStdin()).replace(/\n$/, "");
  }

  const opts: TransliterateOptions = {
    mode: args.mode,
    punctuation: !args.noPunct,
  };

  const result = args.reverse ? toLatin(text, opts) : toFidel(text, opts);
  process.stdout.write(result + "\n");
}

main().catch((err) => {
  process.stderr.write(String(err instanceof Error ? err.stack ?? err.message : err) + "\n");
  process.exit(1);
});
