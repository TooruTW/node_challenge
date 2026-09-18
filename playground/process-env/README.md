# process-env

題目在 `problem.ts`，作答寫在 `answer.ts`。`locked/` 裡的測試、提示、標準答案不要改、先別看。

## 結構

```
playground/process-env/
  problem.ts                 ← 題目，不要改
  answer.ts                  ← 作答，只改這裡
  README.md
  locked/
    process-env.test.ts      ← 行為測試
    hints.md                 ← 給輔助者，解題時別看
    solution.ts              ← 對答案用，解題時別看
```

根目錄跑測：`node --test playground/process-env/locked/process-env.test.ts`

## 出題方向

練一件事：設定常常從**環境**進來，不是從命令列。Node 把當下行程的環境變數放在 **`process.env`**，要會讀它，不要自己去掃字串、開檔、或跟 `argv` 搞混。

三個 export 只是把官方行為接出來給測試呼叫：**不是**要你寫 parser，也**不是**要你讀 `.env` 檔。函式本體沒必要的東西都不要放（中間變數、`Number(...)`、`JSON.parse`、truthy 判斷）。看起來「差不多對」的假實作反而會誤導。直接讀 `process.env` 即可。

## 學習目標

學會讀當下行程的 `process.env`：沒設過是 `undefined`，有設過一律是字串（含空字串）。不要把環境變數當成數字、布林，或命令列參數。

## 使用情境

同一個程式在本機、CI、正式機跑，連線字串、埠號、`NODE_ENV` 通常**不寫死在程式裡**，而是由啟動它的環境注入。腳本啟動後，用 `process.env` 讀當下這份環境。

常見場合：

- 本機用 shell 設 `PORT=3000` 再跑 `node app.ts`；容器／平台則在儀表板或編排檔注入同名變數。
- CI 把 token、資料庫 URL 當密文變數灌進行程，程式只讀、不把密文寫進 repo。
- 開關行為：有設 `DEBUG` 才多印 log；沒設就當預設路徑。空字串跟「根本沒這筆」語意不同。
- 值看起來像 `3000`、`true` 仍是字串。要不要再轉型是你的應用邏輯；這題只要先把環境裡的字讀出來。

`process.argv` 是這次啟動時打在命令列上的字；`process.env` 是行程繼承來的環境。上一題練過 argv，這題只練 env。不要讀 `.env` 檔（那是另一套載入方式，之後才會碰到）。

## 基礎知識關鍵字

解題前先能對上這些詞（查 [process.env](https://nodejs.org/api/process.html#processenv) 與 [environment variables](https://nodejs.org/api/environment_variables.html)，不要靠猜）：

| 關鍵字 | 在這題裡代表什麼 |
|--------|------------------|
| 環境變數 | 行程啟動時從作業系統（或父行程）繼承的鍵值，不是檔案裡的設定物件 |
| `process` | 當下行程；多數情況是全域物件，不必 `import` 也能用 |
| `process.env` | 讀寫這份環境的物件。這題只要**讀** |
| `node:process` | 也可以 `import { env } from "node:process"`，和全域 `process.env` 是同一份 |
| 缺席 | 沒設過的鍵讀起來是 `undefined`，不是 `""` |
| 空字串 | 有設、值是 `""`。跟缺席不同 |
| 字串值 | 文件裡的例子（`PORT`、`HOME`）都是字串；`"3000"` 不是數字 `3000` |
| `delete process.env.NAME` | 官方用來拿掉一筆，之後讀回來才是 `undefined`。指定成 `undefined` 反而會變成字串 `"undefined"`（文件有寫，這題不必自己試寫入） |
| `process.argv` | 命令列參數。這題不要讀它 |
| `--env-file` / `process.loadEnvFile` / `util.parseEnv` | 從 `.env` 檔灌進或解析環境。這題不練、不要用 |
| Windows 大小寫 | Windows 上環境變數名稱不分大小寫；這題測資用固定名稱，不要自己改大小寫來賭 |

TypeScript 這邊只要會：`string` 與 `string | undefined`。不必另裝 dotenv 套件。

## 題目

實作三個函式（都讀**當下行程**的環境，測試不會把整理過的物件當參數塞進來）：

- `getEnv(name)`：回傳名為 `name` 的環境變數。沒設過回 `undefined`；有設過回那個字串（含空字串）。請直接讀 `process.env`。
- `hasEnv(name)`：有設過（含空字串、`"0"`）回 `true`；沒設過回 `false`。不要用 truthy（`if (value)`）判斷。
- `getEnvOr(name, fallback)`：沒設過才回 `fallback`；空字串仍算有值，不要換成 fallback。

這三個就是文件裡 `process.env` 的讀法，包一層即可。函式裡不要塞多餘的東西。

## 限制

- 只能用 Node 內建能力，不要裝套件（含 dotenv）。
- 不要讀 `process.argv`、不要 `child_process`、不要 `process.exit`。
- 不要讀、解析 `.env` 檔（不要 `loadEnvFile`、`parseEnv`、`--env-file`）。
- 不必處理非字串的變數名稱；不必寫入環境（測試會幫你設測資）。
- 不必處理 Worker、也不必模擬 Windows 大小寫。

## 完成條件

專案根目錄執行：

```bash
node --test playground/process-env/locked/process-env.test.ts
```

全部測試通過即完成。
