import { parseArgs } from "node:util";

export function argv0(): string {
  return process.argv[0];
}

export function argv1(): string {
  return process.argv[1];
}

export function userArgs(): string[] {
  return process.argv.slice(2);
}

export function parseToolArgs(): {
  values: { verbose?: boolean; output?: string };
  positionals: string[];
} {
  return parseArgs({
    options: {
      verbose: { type: "boolean", short: "v" },
      output: { type: "string", short: "o" },
    },
    allowPositionals: true,
  });
}

if (import.meta.main) {
  /* problem 1 */
  console.log("problem 1");
  console.log("ARGV0", JSON.stringify(argv0()));
  console.log("ARGV1", JSON.stringify(argv1()));
  console.log("USER_ARGS", JSON.stringify(userArgs()));

  /* problem 2 */
  console.log("problem 2");
  const parsed = parseToolArgs();
  console.log("PARSE_RESULT", JSON.stringify(parsed));
}
