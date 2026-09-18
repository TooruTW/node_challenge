// 引入需要的工具包
import process from "node:process";
import { parseArgs } from "node:util";

/** argv[0]：這次行程的執行檔路徑（你打的 `node` 實際指到哪）。
 * 工具提示: process.argv
 */
export function argv0(): string {
  const ans= process.argv[0]
  return ans;
}

/** argv[1]：正在跑的腳本路徑（這題是 answer.ts）。
 * 工具提示: process.argv
 */
export function argv1(): string {
  const ans= process.argv[1]
  return ans;
}

/** argv[2] 起：使用者在指令後面打的參數。不要掃描哪一格像路徑，也不要在這裡解析 `--`。
 * 下面這幾個指令都要能跑（在專案根目錄執行）：
 *   node playground/cli-args/answer.ts one two=three four
 *     → [2+] 應是 ["one", "two=three", "four"]
 *   node playground/cli-args/answer.ts
 *     → [2+] 應是 []
 *   node playground/cli-args/answer.ts --verbose -o out.txt in.txt
 *     → [2+] 仍是 ["--verbose", "-o", "out.txt", "in.txt"]
 * 工具提示: process.argv
 */
export function userArgs(): string[] {
  const ans = process.argv.slice(2);
  return ans;
}

/** 學習使用 parseArgs。這功能要能取出指令裡的數值。要用 parseArgs，工具說明自己去查。
 * 下面這幾個指令都要能跑、並取出數值（在專案根目錄執行）：
 *   node playground/cli-args/answer.ts --verbose
 *   node playground/cli-args/answer.ts -v -o out.txt
 *   node playground/cli-args/answer.ts --output=dest.log a
 * 測試會核對：verbose / -v 為布林、output / -o 為字串，其餘為 positionals。
 * 不要自己 split、不要 startsWith('--')。
 * 工具提示: util.parseArgs()
 */
export function parseToolArgs(): {
  values: { verbose?: boolean; output?: string };
  positionals: string[];
} {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      verbose: {
        type: "boolean",
        short: "v",
      },
      output: {
        type: "string",
        short: "o",
      },
    },
  });
  return { values, positionals };
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
