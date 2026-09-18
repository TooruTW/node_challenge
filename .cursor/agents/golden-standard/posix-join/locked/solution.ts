import path from "node:path";

export function joinPosix(...parts: string[]): string {
  return path.posix.join(...parts);
}

export function posixBasename(filePath: string): string {
  return path.posix.basename(filePath);
}

export function posixExtname(filePath: string): string {
  return path.posix.extname(filePath);
}
