import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, test } from "node:test";
import { errorPath, getErrorCode, isErrorCode } from "../answer.ts";

function catchThrown(fn: () => unknown): unknown {
  try {
    fn();
  } catch (error) {
    return error;
  }
  throw new Error("expected a throw");
}

function missingFileError(): { error: unknown; missing: string } {
  const missing = path.join(
    os.tmpdir(),
    `node-challenge-error-code-missing-${process.pid}-${Date.now()}`,
  );
  return { error: catchThrown(() => fs.readFileSync(missing)), missing };
}

describe("getErrorCode", () => {
  test("plain Error with a file-not-found message has no code", () => {
    assert.equal(getErrorCode(new Error("no such file")), undefined);
  });

  test("plain Error whose message mentions ENOENT still has no code", () => {
    assert.equal(getErrorCode(new Error("ENOENT: no such file or directory")), undefined);
  });

  test("TypeError has no code", () => {
    assert.equal(getErrorCode(new TypeError("not a function")), undefined);
  });

  test("a real missing-file SystemError is ENOENT", () => {
    const { error } = missingFileError();
    assert.equal(getErrorCode(error), "ENOENT");
  });

  test("a Node ERR_* error exposes that code", () => {
    assert.equal(getErrorCode(catchThrown(() => new URL(""))), "ERR_INVALID_URL");
  });
});

describe("isErrorCode", () => {
  test("true only when error.code equals the given string", () => {
    const { error } = missingFileError();
    assert.equal(isErrorCode(error, "ENOENT"), true);
    assert.equal(isErrorCode(error, "EACCES"), false);
  });

  test("a similar message is not a matching code", () => {
    const decoy = new Error("ENOENT: no such file or directory");
    assert.equal(isErrorCode(decoy, "ENOENT"), false);
  });

  test("plain Error with no such file message is not ENOENT", () => {
    assert.equal(isErrorCode(new Error("no such file"), "ENOENT"), false);
  });
});

describe("errorPath", () => {
  test("plain Error and TypeError have no path", () => {
    assert.equal(errorPath(new Error("no such file")), undefined);
    assert.equal(errorPath(new TypeError("not a function")), undefined);
  });

  test("a real missing-file SystemError carries the opened path", () => {
    const { error, missing } = missingFileError();
    assert.equal(errorPath(error), missing);
  });

  test("a Node ERR_* error without a filesystem path is undefined", () => {
    assert.equal(errorPath(catchThrown(() => new URL(""))), undefined);
  });
});
