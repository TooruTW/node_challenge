# 提示（給輔助者，一次只升一階）

## 1 觀念

這題在練：Node 的錯誤要辨識「是哪一種失敗」，不是去讀人看的那句話。系統開檔失敗和你自己 `throw new Error(...)` 看起來都像錯誤，但穩定可比的是結構化欄位，不是 `message` 字串。

## 2 方向

官方文件關鍵字：[errors](https://nodejs.org/api/errors.html) 裡的 `error.code`、SystemError、`error.path`。普通 `Error` / `TypeError` 常常根本沒有這些欄位。這題不是掃消息、不是 `util.getSystemErrorName`、也不是自己開檔去生錯誤。

## 3 縮小

對一下失敗的案例在測哪種規則：消息裡寫著「no such file」或「ENOENT」仍沒有 `code`；真正開不到檔才是 `ENOENT`，且 `path` 是那條開檔路徑。`isErrorCode` 比的是 `code` 字串相不相等，不是訊息像不像。沒有 `path` 的錯誤回 `undefined`。
