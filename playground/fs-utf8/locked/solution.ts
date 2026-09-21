import fs from "node:fs";

export function readTextSync(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

export function writeTextSync(filePath: string, contents: string): void {
  fs.writeFileSync(filePath, contents);
}

export function appendTextSync(filePath: string, contents: string): void {
  fs.appendFileSync(filePath, contents);
}
