// 引入需要的工具包

/** 讀當下行程的環境變數。沒設過回 `undefined`；有設過則是字串（含空字串）。
 * 不要讀 argv、不要開 .env 檔、不要 Number / JSON.parse。
 * 工具提示: process.env
 */
export function getEnv(name: string): string | undefined {
}

/** 變數有設過（含空字串）為 true；沒設過為 false。
 * 不要用 truthy 判斷：空字串與 `"0"` 仍算有設。
 * 工具提示: process.env
 */
export function hasEnv(name: string): boolean {
}

/** 沒設過才用 fallback；空字串仍算有值，不要改成 fallback。
 * 工具提示: process.env
 */
export function getEnvOr(name: string, fallback: string): string {
}
