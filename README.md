# Node Challenge

用本機 Node 24 解內建 API 的小題。不要另裝測試框架。

## 準備

```bash
npm install
```

需要 Node `>= 24`。

## 解題

1. 打開 `playground/<題名>/`（第一題是 `posix-join`）。
2. 看 `README.md` 和 `problem.ts`。
3. 只改 `answer.ts`。
4. 不要改、先別看 `locked/`（測試、提示、標準答案）。

題目清單：`docs/playground.md`。進度：`docs/progress.md`。

## 跑測

專案根目錄：

```bash
node --test playground/<題名>/locked/<題名>.test.ts
```

例如：

```bash
node --test playground/posix-join/locked/posix-join.test.ts
```

Node 跑 TypeScript 時不做型別檢查。要檢查：

```bash
npm run typecheck
```

## 跟 agent 說

沒點名角色就是預設：不代寫、不劇透。

| 你要 | 叫誰 |
|------|------|
| 新題 | 出題者 `setter` |
| 提示 | 輔助者 `tutor` |
| 跑測／評分 | 測試者 `tester` |
| Node API 行為 | 文件 `docs` |
