import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { describe, test } from "node:test";
import { fileURLToPath } from "node:url";

const answerFile = fileURLToPath(new URL("../answer.ts", import.meta.url));

function runCli(...cli: string[]) {
  const { status, stdout, stderr } = spawnSync(
    process.execPath,
    [answerFile, ...cli],
    { encoding: "utf8" },
  );
  assert.equal(status, 0, stderr);
  return stdout;
}

function lineJson<T>(stdout: string, prefix: string): T {
  const line = stdout.split(/\r?\n/).find((row) => row.startsWith(prefix));
  assert.ok(line, `expected ${prefix.trim()} line from CLI stdout`);
  return JSON.parse(line.slice(prefix.length)) as T;
}

function userArgsResult(stdout: string) {
  return lineJson<string[]>(stdout, "USER_ARGS ");
}

function parseResult(stdout: string) {
  return lineJson<{
    values: { verbose?: boolean; output?: string };
    positionals: string[];
  }>(stdout, "PARSE_RESULT ");
}

describe("argv slots via real CLI", () => {
  test("node answer.ts one two=three four", () => {
    const stdout = runCli("one", "two=three", "four");
    assert.equal(lineJson<string>(stdout, "ARGV0 "), process.execPath);
    assert.equal(lineJson<string>(stdout, "ARGV1 "), answerFile);
    assert.deepEqual(userArgsResult(stdout), ["one", "two=three", "four"]);
  });

  test("node answer.ts", () => {
    assert.deepEqual(userArgsResult(runCli()), []);
  });

  test("node answer.ts --verbose -o out.txt in.txt", () => {
    assert.deepEqual(
      userArgsResult(runCli("--verbose", "-o", "out.txt", "in.txt")),
      ["--verbose", "-o", "out.txt", "in.txt"],
    );
  });
});

describe("parseToolArgs via real CLI", () => {
  test("node answer.ts -v --output out.txt", () => {
    const { values, positionals } = parseResult(
      runCli("-v", "--output", "out.txt"),
    );
    assert.equal(values.verbose, true);
    assert.equal(values.output, "out.txt");
    assert.deepEqual(positionals, []);
  });

  test("node answer.ts in.txt more.txt", () => {
    const { values, positionals } = parseResult(runCli("in.txt", "more.txt"));
    assert.equal(values.verbose, undefined);
    assert.equal(values.output, undefined);
    assert.deepEqual(positionals, ["in.txt", "more.txt"]);
  });

  test("node answer.ts -o out.txt in.txt", () => {
    const { values, positionals } = parseResult(
      runCli("-o", "out.txt", "in.txt"),
    );
    assert.equal(values.output, "out.txt");
    assert.equal(values.verbose, undefined);
    assert.deepEqual(positionals, ["in.txt"]);
  });

  test("node answer.ts --output=dest.log a", () => {
    const { values, positionals } = parseResult(
      runCli("--output=dest.log", "a"),
    );
    assert.equal(values.output, "dest.log");
    assert.deepEqual(positionals, ["a"]);
  });

  test("node answer.ts --verbose -o x a b", () => {
    const { values, positionals } = parseResult(
      runCli("--verbose", "-o", "x", "a", "b"),
    );
    assert.equal(values.verbose, true);
    assert.equal(values.output, "x");
    assert.deepEqual(positionals, ["a", "b"]);
  });
});
