# 提示（給輔助者，一次只升一階）

## 1 觀念

這題在練：腳本看到的設定，很多不是參數，而是行程啟動時從作業系統帶進來的環境變數。Node 把它們放在當下行程的 `process.env`。

## 2 方向

官方文件關鍵字：`process.env`（[process](https://nodejs.org/api/process.html#processenv)、[environment variables](https://nodejs.org/api/environment_variables.html)）。讀某個名字對應的值即可。這題不是 `process.argv`，也不是 `--env-file` / `process.loadEnvFile` / `util.parseEnv`。

## 3 縮小

對一下失敗的案例在測哪種規則：沒出現的鍵是 `undefined`（不是 `""`）；值永遠是字串（`"3000"` 不要變成數字）；空字串是「有設」；`getEnvOr` 只有缺席才用 fallback。不要用 `if (value)` 這種 truthy 判斷。
