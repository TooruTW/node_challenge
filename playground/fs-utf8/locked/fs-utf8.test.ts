import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, describe, test } from "node:test";
import { appendTextSync, readTextSync, writeTextSync } from "../answer.ts";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "node-challenge-fs-utf8-"));
let n = 0;

function tmpFile(): string {
  n += 1;
  return path.join(dir, `f-${n}.txt`);
}

after(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

describe("readTextSync", () => {
  test("returns the file as a string, not a Buffer", () => {
    const file = tmpFile();
    fs.writeFileSync(file, "hello", "utf8");
    const text = readTextSync(file);
    assert.equal(typeof text, "string");
    assert.equal(text, "hello");
  });

  test("empty file is an empty string", () => {
    const file = tmpFile();
    fs.writeFileSync(file, "", "utf8");
    assert.equal(readTextSync(file), "");
  });

  test("round-trips UTF-8 text", () => {
    const file = tmpFile();
    fs.writeFileSync(file, "你好，世界\n", "utf8");
    assert.equal(readTextSync(file), "你好，世界\n");
  });
});

describe("writeTextSync", () => {
  test("writes the string as the whole file", () => {
    const file = tmpFile();
    writeTextSync(file, "first");
    assert.equal(fs.readFileSync(file, "utf8"), "first");
  });

  test("overwrites existing contents", () => {
    const file = tmpFile();
    fs.writeFileSync(file, "old-content", "utf8");
    writeTextSync(file, "new");
    assert.equal(fs.readFileSync(file, "utf8"), "new");
  });

  test("writes UTF-8 text", () => {
    const file = tmpFile();
    writeTextSync(file, "café");
    assert.equal(fs.readFileSync(file, "utf8"), "café");
  });
});

describe("appendTextSync", () => {
  test("creates the file when it is missing", () => {
    const file = tmpFile();
    appendTextSync(file, "start");
    assert.equal(fs.readFileSync(file, "utf8"), "start");
  });

  test("appends instead of overwriting", () => {
    const file = tmpFile();
    fs.writeFileSync(file, "ab", "utf8");
    appendTextSync(file, "cd");
    assert.equal(fs.readFileSync(file, "utf8"), "abcd");
  });

  test("appends UTF-8 text", () => {
    const file = tmpFile();
    appendTextSync(file, "你");
    appendTextSync(file, "好");
    assert.equal(fs.readFileSync(file, "utf8"), "你好");
  });
});
