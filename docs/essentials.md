# Node 功能

## 基礎（必須會）

1. **命令列**：用 `node` 跑腳本、傳參數與選項。
2. **process**：讀寫當前行程的資訊，並控制行程本身。
3. **環境變數**：讀取行程所在環境的變數。
4. **錯誤**：分辨系統錯誤、JavaScript 錯誤，以及非同步裡丟出的錯誤。
5. **全域物件**：所有模組都能用的內建物件（不必 `import`）。
6. **console**：把除錯訊息印到終端。
7. **timers**：用 `setTimeout` / `setInterval` 把函式排到之後執行。
8. **ESM**：用 `import` / `export` 拆模組（現行標準）。
9. **CommonJS**：用 `require` / `module.exports` 拆模組（舊生態系仍常見）。
10. **packages**：`package.json` 怎麼描述套件、Node 怎麼解析它。
11. **path**：拼接、解析檔案與目錄路徑（含跨平台差異）。
12. **fs**：讀寫檔案與目錄。
13. **buffer**：處理原始位元組資料，而不是字串。
14. **stream**：一塊一塊處理資料，避免整份載入記憶體。
15. **events**：物件發出事件、函式監聽事件（Node 多數 API 的底層模式）。
16. **http**：寫 HTTP 伺服器與發出 HTTP 請求。
17. **url**：解析與組合 URL。
18. **child_process**：另外開一個行程來跑命令或程式。
19. **os**：查 CPU、記憶體、平台等主機資訊。
20. **crypto**：雜湊、隨機數、加解密。
21. **test**：用內建測試跑行為檢查。
22. **worker_threads**：在同一個行程裡平行跑 JavaScript。

## 中階

23. **https**：在 TLS 上跑 HTTP（加密連線的用戶端與伺服器）。
24. **tls**：TLS／SSL 連線本身（憑證、握手、加密通道）。
25. **net**：用 TCP 或 IPC 做底層網路伺服器與用戶端。
26. **dns**：把主機名解析成 IP。
27. **zlib**：壓縮與解壓縮（gzip、deflate、brotli、zstd）。
28. **readline**：從 stdin 一列一列讀輸入。
29. **web streams**：瀏覽器同款的 `ReadableStream`／`WritableStream`。
30. **util**：官方雜項工具（格式化、`promisify`、上色文字等）。
31. **非同步上下文**：在非同步呼叫鏈裡傳遞資料（例如 request id），不必一層層當參數傳。
32. **debugger**：用內建除錯器逐步執行、檢查變數。
33. **TypeScript**：讓 Node 直接跑 TypeScript 的內建支援。
34. **dgram**：UDP 封包（不保證送達的網路通訊）。
35. **sqlite**：內建 SQLite 資料庫。
36. **module API**：程式裡查詢、掛載模組載入行為。
37. **perf_hooks**：量測程式跑了多久、哪段慢。

## 進階

38. **http2**：HTTP/2 協定（多路複用、標頭壓縮）。
39. **cluster**：開多個 Node 行程，把工作分到不同行程。
40. **vm**：在隔離的 V8 環境裡編譯、執行程式碼。
41. **inspector**：用程式控制 V8 除錯器（連 Chrome DevTools 那套）。
42. **diagnostic report**：把當下行程狀態寫成一份 JSON 診斷報告。
43. **trace events**：集中收集 V8 與 Node 的追蹤資料。
44. **diagnostics_channel**：自己發出診斷訊息通道，給監控工具接。
45. **permissions**：限制行程能碰哪些系統資源。
46. **single executable**：把應用打成不必先裝 Node 的單一執行檔。
47. **Node-API**：寫原生 C／C++ 擴充，且跨 Node 大版本 ABI 穩定。
48. **WASI**：在 Node 裡跑 WebAssembly，並介接系統能力。
49. **FFI**：從 JavaScript 載入動態函式庫、呼叫 native 符號。
50. **vfs**：記憶體裡的虛擬檔案系統（測資、內嵌檔用）。
51. **Web Crypto**：瀏覽器同款的 Web Crypto API。
52. **v8**：碰 V8 引擎本身的 heap、序列化等底層 API。
