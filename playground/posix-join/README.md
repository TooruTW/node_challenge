# posix-join

在這個檔解題：`posix-join.ts`。`locked/` 裡的測試、提示、答案不要改、先別看。

## 結構

```
playground/posix-join/
  posix-join.ts              ← 只改這裡
  README.md
  locked/
    posix-join.test.ts       ← 行為測試
    hints.md                 ← 給輔助者，解題時別看
    solution.ts              ← 對答案用，解題時別看
```

根目錄跑測：`node --test playground/posix-join/locked/posix-join.test.ts`

## 出題方向

練一件事：路徑規則在 Node 裡已經有了，要會選 **`path.posix`**，不要自己拼字串、也不要用會跟 Windows 走的預設 `path`。

三個 export 只是把官方 API 接出來給測試呼叫，**不是**要你手寫正規化。函式本體沒必要的東西都不要放（中間變數、註解掉的嘗試、自己 `split` / `join`）。看起來「差不多對」的假實作反而會誤導。直接 `return path.posix.…(...)` 即可。

## 學習目標

學會用 Node 內建模組 `node:path` 處理 **POSIX 路徑**（永遠用 `/`），而不是自己用字串拼接。

Windows 上 `path.join` 會用 `\`。這題要求結果在任何作業系統都長得像 Unix 路徑，所以要查 `path.posix`。

## 使用情境

本機開檔、寫檔，用預設的 `path`（Windows 就是 `\`）就對了。這題練的是另一類字串：看起來像路徑，但**不能跟著本機 OS 變分隔符**。

常見場合：

- 你在 Windows 開發，產出的路徑要給 Linux 伺服器、Docker、CI 用。
- 物件儲存的 key（S3、GCS）、zip 裡的條目、git 路徑、多數 HTTP URL 路徑，慣例都是 `/`。
- 設定檔、log 裡寫死相對位置，例如 `logs/app.log`，希望任何機器印出來都一樣。
- 從一段路徑取出檔名或副檔名來分流（`.log` 走 log、`.json` 當設定），規則要跟 Unix 一致。

`join` 負責把多段接起來並清掉 `..`、多餘的 `/`；`basename` / `extname` 負責從結果裡拆檔名與副檔名。不要用字串 `+` 硬接，Windows 上很容易變成混著 `\` 的不可攜字串。

## 基礎知識關鍵字

解題前先能對上這些詞（查 [path](https://nodejs.org/api/path.html)，不要靠猜字串規則）：

| 關鍵字 | 在這題裡代表什麼 |
|--------|------------------|
| `node:path` | Node 內建路徑模組；`node:` 前綴表示內建，不是 npm 套件 |
| POSIX / Win32 | 兩套路徑規則：`/` vs `\`，磁碟代號、根目錄語意不同 |
| `path.posix` / `path.win32` | 強制用某一套規則，不跟本機 OS 走 |
| `path`（預設 export） | 跟本機 OS 同一套；Windows 上等於 win32 |
| `join` | 接多段路徑並正規化；中間出現以 `/` 開頭的片段**不會**丟掉前面 |
| `resolve` | 從右往左組出絕對路徑；遇到絕對片段會丟掉左邊。這題要的是 `join` |
| `normalize` | 清 `..`、`.`、多餘分隔符；`join` 內部會做類似的事 |
| `basename` | 最後一個片段（檔名或目錄名） |
| `extname` | 最後一個副檔名（含 `.`）；沒有則 `""` |
| `.` / `..` | 目前目錄、上一層；空路徑正規化後常變成 `.` |
| 點檔（dotfile） | 像 `.gitignore`：開頭那個 `.` 不是副檔名 |

TypeScript 這邊只要會：`import … from "node:path"`、函式參數與回傳都是 `string`。不必另裝路徑套件。

## 題目

實作三個函式：

- `joinPosix(...parts)`：把多段路徑接成一段，並做正規化（`..`、多餘的 `/`、空片段）。請直接呼叫 `path.posix.join`，不要用 `resolve`（`resolve` 才會從右往左「遇到絕對路徑就丟掉前面」）。
- `posixBasename(filePath)`：回傳最後一個路徑片段（檔名或目錄名）。請直接呼叫 `path.posix.basename`。
- `posixExtname(filePath)`：回傳最後一個副檔名（含前面的 `.`）；沒有副檔名時回傳空字串。請直接呼叫 `path.posix.extname`。

這三個就是 Node 現成的 API，包一層即可，不必自己重寫規則。函式裡不要塞多餘的東西。

## 限制

- 只能用 Node 內建模組，不要裝套件。
- 不要呼叫作業系統相關的 `path.join`（平台相關）；這題要可攜的 POSIX 結果。
- 不必處理非字串輸入。

## 完成條件

專案根目錄執行：

```bash
node --test playground/posix-join/locked/posix-join.test.ts
```

全部測試通過即完成。
