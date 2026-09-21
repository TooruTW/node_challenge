# error-code

題目在 `problem.ts`，作答寫在 `answer.ts`。`locked/` 裡的測試、提示、標準答案不要改、先別看。

## 結構

```
playground/error-code/
  problem.ts                 ← 題目，不要改
  answer.ts                  ← 作答，只改這裡
  README.md
  locked/
    error-code.test.ts       ← 行為測試
    hints.md                 ← 給輔助者，解題時別看
    solution.ts              ← 對答案用，解題時別看
```

根目錄跑測：`node --test playground/error-code/locked/error-code.test.ts`

## 出題方向

練一件事：辨識錯誤看 **`error.code`**，不要解析 **`error.message`**。訊息是給人讀的，小版本就可能改；`code` 才是穩定識別碼。

三個 export 只是把錯誤物件上已有的欄位讀出來給測試呼叫，**不是**要你對訊息做 `includes` / regex，也**不是**要你自己 `fs` 開檔去生錯誤。函式本體沒必要的東西都不要放。看起來「差不多對」的假實作（掃字串裡有沒有 `ENOENT`）反而會誤導。直接讀 `error.code` / `error.path` 即可。

## 學習目標

學會用 Node 錯誤上的結構化欄位分辨「系統開檔失敗」和「普通 JavaScript 錯誤」。沒有 `code` 就回 `undefined`，不要用訊息假裝它是 `ENOENT`。

## 使用情境

開檔、連線、權限這類系統呼叫失敗時，Node 丟出的是帶欄位的系統錯誤，不是一句固定中文／英文。程式要分流「檔不存在」還是「權限不夠」，或跟自己 `throw` 的業務錯誤分開，靠的是 `code`（以及系統錯誤常附的 `path`）。

常見場合：

- 讀設定檔：`ENOENT` 走「沒這檔，用預設」；`EACCES` 才當權限問題往上報。
- 同一行程裡，業務規則用 `new Error("...")` 或 `TypeError`；那些沒有系統 `code` / `path`，不要當成開檔失敗。
- CI log 的 `message` 會隨 Node 小版改文案。對訊息做字串匹配，測試與正式機都會莫名其妙紅掉。
- Windows 與 Linux 上，開不到檔的 `code` 仍是 `ENOENT`；路徑字串長得不一樣，要比的是錯誤物件上的 `path`，不是從訊息裡拆。

這題不練事件 `'error'`、未捕捉例外、Promise rejection 的傳播形狀；那些是後面的題。

## 基礎知識關鍵字

解題前先能對上這些詞（查 [errors](https://nodejs.org/api/errors.html)，不要靠猜訊息格式）：

| 關鍵字 | 在這題裡代表什麼 |
|--------|------------------|
| `Error` | JavaScript 錯誤。你 `new Error("no such file")` 通常**沒有** `code` |
| `error.message` | 給人讀的句子；可能隨小版改。這題不要拿它來辨識 |
| `error.code` | 穩定識別碼。系統錯誤如 `ENOENT`；Node 自己的錯誤常是 `ERR_*` |
| SystemError | 系統呼叫失敗時的錯誤；除了 `code`，常還有 `path`、`syscall` |
| `ENOENT` | 常見系統錯誤碼：目標路徑不存在。消息裡寫這幾個字**不算** |
| `error.path` | 系統錯誤上記的那條路徑（例如開檔路徑）；沒有則不該假裝有 |
| `TypeError` | 型別用錯的 JS 錯誤；這題測資沒有 `code`、也沒有 `path` |
| `util.getSystemErrorName` | 從 errno 數字反查名稱。這題不要用；欄位已經在錯誤物件上 |

TypeScript 這邊：`catch` 拿到的是 `unknown`。你可能要窄化或讀屬性。不必另裝錯誤套件，也不必建 errno 對照表。

## 題目

實作三個函式（都讀**傳進來的那個錯誤值**上的欄位）：

- `getErrorCode(error)`：回傳 `error.code`。普通 `Error`、`TypeError` 沒有 code 時回 `undefined`；有 code 的（含 `ENOENT`、Node `ERR_*`）回那個字串。請直接讀 `error.code`，不要掃 `message`。
- `isErrorCode(error, code)`：`error.code` 是否等於給定字串。消息裡碰巧出現同樣文字仍是 `false`。
- `errorPath(error)`：回傳系統錯誤的 `error.path`（開檔路徑）；沒有則 `undefined`。不要從訊息拆路徑。

這三個就是文件裡錯誤物件的讀法，包一層即可。函式裡不要塞多餘的東西。

## 限制

- 只能用 Node 內建能力，不要裝套件。
- 不要對 `message` 做 `includes`、regex 或自己切字串。
- 不要 `util.getSystemErrorName`，不要手寫 errno 對照表。
- 作答裡不必呼叫 `fs` 去生錯誤（測試會自己 `try/catch` 真正的系統錯誤）。
- 不必處理 EventEmitter `'error'`、`uncaughtException`、未處理的 rejection、`.cause` 鏈。

## 完成條件

專案根目錄執行：

```bash
node --test playground/error-code/locked/error-code.test.ts
```

全部測試通過即完成。
