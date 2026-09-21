// 引入需要的工具包

/** 讀錯誤的穩定識別碼。沒有 `code` 的 JS 錯誤回 `undefined`。
 * 不要掃 `message`、不要 includes / regex。
 * 工具提示: error.code
 */
export function getErrorCode(error: unknown): string | undefined {
}

/** `error.code` 是否等於給定字串。消息裡碰巧有同樣文字不算。
 * 工具提示: error.code
 */
export function isErrorCode(error: unknown, code: string): boolean {
}

/** 讀系統錯誤的開檔路徑。沒有 `path` 則 `undefined`。
 * 不要從 `message` 拆路徑。
 * 工具提示: error.path
 */
export function errorPath(error: unknown): string | undefined {
}
