# cli-args

題目在 `problem.ts`，作答寫在 `answer.ts`。`locked/` 裡的測試、提示、標準答案不要改、先別看。

## 結構

```
playground/cli-args/
  problem.ts                 ← 題目，不要改
  answer.ts                  ← 作答，只改這裡
  README.md
  locked/
    cli-args.test.ts         ← 行為測試
    hints.md                 ← 給輔助者，解題時別看
    solution.ts              ← 對答案用，解題時別看
```

根目錄跑測：`node --test playground/cli-args/locked/cli-args.test.ts`

## 出題方向

練一件事：Node 怎麼把命令列交給腳本，以及怎麼把「使用者打的字」變成可取出的數值。陣列形狀在 `process.argv` 裡已經定好；選項語意請用內建 `parseArgs`，不要自己 `split`、不要 `startsWith('--')` 寫 parser。

這些函式只是把官方行為接出來。檔案末尾有一段「只有被 `node` 直接跑才執行」的入口，只呼叫你寫的函式並印結果。兩題測試都會真的執行 `node answer.ts …`。

## 學習目標

學會讀 `process.argv` 的固定形狀（`[0]` 是 node、`[1]` 是腳本、`[2]` 起才是使用者參數），並用內建 `parseArgs` 取出指令裡的值。

## 使用情境

你在終端打 `node app.js --verbose -o out.txt in.txt` 時，腳本要知道使用者到底打了什麼。Node 把整行收成 `argv` 陣列；要把 `--verbose`、`-o`、檔名變成結構化資料，請查 `parseArgs`。

常見場合：

- 本機跑一支小腳本：`node build.js src/index.ts`，只要位置參數，先從完整 argv 拿掉前兩格。
- 工具要開關與輸出路徑：`--verbose` / `-v`、`--output dest` / `-o dest`。
- 同一支程式給人、給 CI 呼叫時，參數順序會變；解析器依規格吃掉選項值，剩下的進位置參數。
- 寫的時候用 `node playground/cli-args/answer.ts …` 真的傳參數自測；評分也是測同一條路，不必在作答裡 spawn 子進程。

## 基礎知識關鍵字

解題前先能對上這些詞（查 [process](https://nodejs.org/api/process.html)、[util](https://nodejs.org/api/util.html)、[ESM `import.meta`](https://nodejs.org/api/esm.html#importmeta)）：

| 關鍵字 | 在這題裡代表什麼 |
|--------|------------------|
| `process.argv` | 啟動時的命令列陣列；`[0]` 執行檔、`[1]` 腳本絕對路徑、其餘是使用者參數 |
| `process.argv0` | 啟動時原始的 `argv[0]` 複本；這題要的是一般的 `argv` 形狀，不是它 |
| `process.execArgv` | 傳給 Node 自己的選項（例如 `--inspect`），不會出現在 `argv` 的使用者段。這題不要碰 |
| `parseArgs` | 依規格把使用者參數拆成可取出的選項值與位置參數。用法自己查 |
| `args`（parseArgs 設定） | 要解析的字串陣列。預設等於「`process.argv` 去掉 execPath 與 filename」；自己傳時不要再含那兩格 |
| `options` / `type` | 長名對應布林或字串；設反會跟文件例子對不上 |
| `short` | 單一字元別名，例如 `-v` 對應 `--verbose` |
| `allowPositionals` | 是否接受不是選項的剩餘參數；預設行為請查文件 |
| `--name=value` | 字串選項的行內寫法；交給 `parseArgs`，不要自己切 `=` |
| `import.meta.main` | 這個檔是不是被 `node` 直接跑；測試 import 時為 false，CLI 入口不該誤跑 |

TypeScript 這邊只要會：需要時 `import … from "node:util"`，以及題目給的回傳形狀。不必裝 yargs、commander。

## 題目

實作這些函式：

- `argv0()`：回傳 `process.argv[0]`（執行檔）。
- `argv1()`：回傳 `process.argv[1]`（腳本路徑）。
- `userArgs()`：回傳 `process.argv` 從 `[2]` 起的使用者參數。`--verbose` 在這裡仍是普通字串，不要掃描哪一格像路徑。下面這幾個指令都要能跑：

```bash
node playground/cli-args/answer.ts one two=three four
node playground/cli-args/answer.ts
node playground/cli-args/answer.ts --verbose -o out.txt in.txt
```
- `parseToolArgs()`：學習使用 `parseArgs`。這功能要能取出指令中的數值。要用到 `parseArgs` 這個工具，工具說明自己去查。測試鎖的欄位是：`verbose`／`-v` 布林、`output`／`-o` 字串，其餘為 positionals。回傳 `{ values, positionals }`。下面這幾個指令都要能跑：

```bash
node playground/cli-args/answer.ts --verbose
node playground/cli-args/answer.ts -v -o out.txt
node playground/cli-args/answer.ts --output=dest.log a
```

## 限制

- 只能用 Node 內建模組，不要裝套件（禁止 yargs、commander 等）。
- 作答裡不要呼叫 `child_process`、不要 `process.exit`、不要讀環境變數。
- 測試會自己執行 `node playground/cli-args/answer.ts …`（真實命令列），不會把整理過的參數塞進函式。不必處理非字串輸入。

## 完成條件

專案根目錄執行：

```bash
node --test playground/cli-args/locked/cli-args.test.ts
```

全部測試通過即完成。

### 寫的時候自測

檔案被 `node` 直接跑時，會呼叫上面兩個函式並把結果印到 stdout（測試 import 時不會走這段）。例如：

第一題 `userArgs`：

```bash
node playground/cli-args/answer.ts one two=three four
node playground/cli-args/answer.ts
node playground/cli-args/answer.ts --verbose -o out.txt in.txt
```

第二題 `parseToolArgs`：

```bash
node playground/cli-args/answer.ts --verbose
node playground/cli-args/answer.ts -v -o out.txt
node playground/cli-args/answer.ts --output out.txt
node playground/cli-args/answer.ts --output=dest.log a
node playground/cli-args/answer.ts -o out.txt in.txt more.txt
```
