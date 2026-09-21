# 提示（給輔助者，一次只升一階）

## 1 觀念

這題在練：磁碟上的檔是位元組。要當文字用，讀的時候必須告訴 Node 用哪套編碼。沒指定 encoding，`readFileSync` 回的是 `Buffer`，不是字串。

## 2 方向

官方文件關鍵字：[fs](https://nodejs.org/api/fs.html) 的 `readFileSync`、`writeFileSync`、`appendFileSync`。讀檔的 `encoding` 預設是 `null`；寫檔對字串預設才是 `utf8`。這題不是 stream、不是 `fs.promises`、也不是自己 `Buffer` 再 `toString`。

## 3 縮小

對一下失敗的案例在測哪種規則：回傳值必須是字串（空檔是 `""`）；多語文字要還原成同一個 JS 字串；`writeTextSync` 是整份蓋掉；`appendTextSync` 是接在後面。讀的時候把 encoding 設成 `utf8`，不要拿到 Buffer 再自己轉。
