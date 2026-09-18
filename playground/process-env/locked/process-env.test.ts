import assert from "node:assert/strict";
import { afterEach, describe, test } from "node:test";
import { getEnv, getEnvOr, hasEnv } from "../answer.ts";

const PREFIX = "NODE_CHALLENGE_PROCESS_ENV_";
const touched: string[] = [];

function envName(suffix: string): string {
  return PREFIX + suffix;
}

function setEnv(name: string, value: string): void {
  process.env[name] = value;
  touched.push(name);
}

afterEach(() => {
  for (const name of touched) {
    delete process.env[name];
  }
  touched.length = 0;
});

describe("getEnv", () => {
  test("missing key is undefined; a set key is the string, not empty-by-default", () => {
    const missing = envName("MISSING");
    const present = envName("PRESENT");
    delete process.env[missing];
    setEnv(present, "ok");
    assert.equal(getEnv(missing), undefined);
    assert.equal(getEnv(present), "ok");
  });

  test("returns the string as-is, even when it looks like a number", () => {
    const name = envName("PORT");
    setEnv(name, "3000");
    assert.equal(getEnv(name), "3000");
  });

  test("returns the string as-is, even when it looks like a boolean", () => {
    const name = envName("FLAG");
    setEnv(name, "true");
    assert.equal(getEnv(name), "true");
  });

  test("empty string is a set value", () => {
    const name = envName("EMPTY");
    setEnv(name, "");
    assert.equal(getEnv(name), "");
  });
});

describe("hasEnv", () => {
  test("missing key is false", () => {
    const name = envName("ABSENT");
    delete process.env[name];
    assert.equal(hasEnv(name), false);
  });

  test("empty string still counts as set", () => {
    const name = envName("BLANK");
    setEnv(name, "");
    assert.equal(hasEnv(name), true);
  });

  test("string zero still counts as set", () => {
    const name = envName("ZERO");
    setEnv(name, "0");
    assert.equal(hasEnv(name), true);
  });
});

describe("getEnvOr", () => {
  test("uses fallback only when the key is missing", () => {
    const name = envName("UNSET");
    delete process.env[name];
    assert.equal(getEnvOr(name, "local"), "local");
  });

  test("empty string is kept, not replaced by fallback", () => {
    const name = envName("OPTIONAL");
    setEnv(name, "");
    assert.equal(getEnvOr(name, "local"), "");
  });

  test("returns the set value", () => {
    const name = envName("NODE_ENV");
    setEnv(name, "production");
    assert.equal(getEnvOr(name, "development"), "production");
  });
});
