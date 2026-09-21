# fs-utf8

題目在 `problem.ts`，作答寫在 `answer.ts`。`locked/` 裡的測試、提示、標準答案不要改、先別看。

## 結構

```
playground/fs-utf8/
  problem.ts                 ← 題目，不要改
  answer.ts                  ← 作答，只改這裡
  README.md
  locked/
    fs-utf8.test.ts          ← 行為測試
    hints.md                 ← 給輔助者，解題時別看
    solution.ts              ← 對答案用，解題時別看
```

根目錄跑測：`node --test playground/fs-utf8/locked/fs-utf8.test.ts`

## 出題方向

練一件事：讀文字檔要指定 **UTF-8**。`fs.readFileSync` 沒給 encoding 時回的是 **`Buffer`（位元組）**，不是字串。

三個 export 只是把官方 API 接出來給測試呼叫，**不是**要你自己開 fd、拼 stream、或對 Buffer 做 `toString`。函式本體沒必要的東西都不要放。看起來「差不多對」的假實作（先讀成 Buffer 再自己解碼）反而會誤導。直接呼叫對應的 `fs` 函式即可。

## 學習目標

學會用 `node:fs` 的同步 API 把小檔當 **UTF-8 文字**讀寫。讀要設 encoding；寫是蓋掉還是接在後面，選對函式。

這題不練 callback、`fs.promises`、也不練大檔 stream。

## 使用情境

上一題用 `error.code` 分辨「檔不存在」。這題開始真的碰磁碟：設定、README、短 log、模板，通常整份當字串載入就夠。

常見場合：

- 讀 `config.json`、`.md`、樣板，接下來才 `JSON.parse` 或塞進字串。
- 把一段文字寫進 `out.txt`：要的是**整份換成新內容**，不是接到舊的後面。
- 往 log 檔**加一行**：用 append，不要每次 `writeFile` 把舊 log 蓋掉。
- 檔裡有中文、重音符號時，讀出來必須仍是同一個 JS 字串；當 Buffer 或用錯編碼會變成亂碼。

檔很大、不能整份進記憶體時，才改用 stream。這題測資都是小檔。本機開檔路徑用作業系統那一套即可（上一題的 `path.posix` 是給「不能跟 OS 走」的字串）。

## 基礎知識關鍵字

解題前先能對上這些詞（查 [fs](https://nodejs.org/api/fs.html)，不要靠猜 Buffer 怎麼轉字）：

| 關鍵字 | 在這題裡代表什麼 |
|--------|------------------|
| `node:fs` | Node 內建檔案系統模組 |
| `fs.readFileSync` | 同步把檔案整份讀進記憶體 |
| `encoding` | 怎麼把位元組解成字串。讀檔預設 `null` → 回 `Buffer` |
| `"utf8"` | 這題要的文字編碼；也可寫在 options 物件裡 |
| `Buffer` | 原始位元組。這題回傳值必須是 `string` |
| `fs.writeFileSync` | 同步寫入；預設會**蓋掉**整個檔。字串的 encoding 預設已是 `utf8` |
| `fs.appendFileSync` | 同步接到檔尾；檔不存在會新建 |
| `fs.promises` / callback `fs.readFile` | 非同步讀法。這題用 Sync，不要混 |
| `createReadStream` | 一塊一塊讀。這題是小檔整份讀，不要用 |
| `fs.read` / 檔案描述符 `fd` | 更底層的讀法。這題不要自己 `open` |

TypeScript 這邊：路徑與內容都是 `string`；寫入函式回 `void`。不必另裝檔案套件。

## 題目

實作三個函式（路徑由呼叫端傳入，測試會準備暫存檔）：

- `readTextSync(filePath)`：把檔案讀成 UTF-8 字串。請直接呼叫 `fs.readFileSync` 並指定 encoding，不要拿到 Buffer 再轉。
- `writeTextSync(filePath, contents)`：把字串寫進檔案，**蓋掉**原內容。請直接呼叫 `fs.writeFileSync`，不要用 append。
- `appendTextSync(filePath, contents)`：把字串接到檔案末尾；檔還不存在就新建。請直接呼叫 `fs.appendFileSync`，不要用 `writeFile`。

這三個就是文件裡的同步讀寫，包一層即可。函式裡不要塞多餘的東西。

## 限制

- 只能用 Node 內建模組，不要裝套件。
- 不要 `createReadStream` / `createWriteStream`。
- 不要 callback 版、不要 `node:fs/promises`（之後才練非同步 I/O）。
- 不要自己 `open` / `read` / `write` fd。
- 不必處理目錄、大檔、編碼不是 UTF-8 的檔、也不必自己 catch `ENOENT`（讀不到就讓它丟）。

## 完成條件

專案根目錄執行：

```bash
node --test playground/fs-utf8/locked/fs-utf8.test.ts
```

全部測試通過即完成。
