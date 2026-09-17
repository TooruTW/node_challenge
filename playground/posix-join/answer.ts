// 引入需要的工具包
import path from "path";

/** 把多段路徑接成 POSIX 路徑（永遠 `/`），並正規化 `..`、多餘 `/`、空片段。
 * 不要 `resolve`、不要自己拼、不要中間變數。
 * 工具提示: path.posix.join()
 */
export function joinPosix(...parts: string[]): string {
    return path.posix.join(...parts);
}

/** 最後一個路徑片段（檔名或目錄名）；結尾 `/` 不算。
 * 工具提示: path.posix.basename(filePath)
 * */
export function posixBasename(filePath: string): string {
    return path.posix.basename(filePath);
}

/** 最後一個副檔名（含 `.`）；點檔如 `.gitignore` 回 `""`。
 * 工具提示: path.posix.extname(filePath)
 * */
export function posixExtname(filePath: string): string {
    return path.posix.extname(filePath);
}
