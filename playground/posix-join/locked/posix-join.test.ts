import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { joinPosix, posixBasename, posixExtname } from "../posix-join.ts";

describe("joinPosix", () => {
  test("joins segments with /", () => {
    assert.equal(joinPosix("logs", "app.log"), "logs/app.log");
  });

  test("normalizes ..", () => {
    assert.equal(joinPosix("a/b", "..", "c"), "a/c");
  });

  test("normalizes a segment that starts with / as another piece, not a reset", () => {
    assert.equal(joinPosix("a", "/b", "c"), "a/b/c");
  });

  test("matches the official join example with ..", () => {
    assert.equal(joinPosix("/foo", "bar", "baz/asdf", "quux", ".."), "/foo/bar/baz/asdf");
  });

  test("collapses a trailing slash on an earlier segment", () => {
    assert.equal(joinPosix("a/", "b"), "a/b");
  });

  test("empty join is the current directory", () => {
    assert.equal(joinPosix(""), ".");
  });
});

describe("posixBasename", () => {
  test("returns the last segment", () => {
    assert.equal(posixBasename("/tmp/logs/app.log"), "app.log");
  });

  test("trailing slash still yields the directory name", () => {
    assert.equal(posixBasename("/tmp/logs/"), "logs");
  });
});

describe("posixExtname", () => {
  test("returns the last extension", () => {
    assert.equal(posixExtname("app.log"), ".log");
    assert.equal(posixExtname("archive.tar.gz"), ".gz");
  });

  test("a leading-dot basename has no extension", () => {
    assert.equal(posixExtname(".gitignore"), "");
  });
});
