// 引入需要的工具包

/** 把檔案整份讀成 UTF-8 字串。沒指定 encoding 會拿到 Buffer。
 * 不要 createReadStream、不要自己對 Buffer 做 toString。
 * 工具提示: fs.readFileSync(path, "utf8")
 */
export function readTextSync(filePath: string): string {
}

/** 用 UTF-8 把字串寫進檔案，蓋掉原內容。
 * 不要 append、不要自己轉 Buffer。
 * 工具提示: fs.writeFileSync(file, data)
 */
export function writeTextSync(filePath: string, contents: string): void {
}

/** 用 UTF-8 把字串接到檔案末尾；檔不存在就新建。
 * 不要用 writeFile（會蓋掉）。
 * 工具提示: fs.appendFileSync(path, data)
 */
export function appendTextSync(filePath: string, contents: string): void {
}
