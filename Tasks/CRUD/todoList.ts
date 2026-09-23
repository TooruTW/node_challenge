import { parseArgs, styleText } from "node:util";
import fs from "node:fs";

const dataFilePath = "./data.json";

type TodoItem = {
  id: string;
  value: string;
  createAt: string;
  updateAt: string;
};

// 檔案驗證 - 確保檔案存在並格式正確
const makeSureDataFileWork = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, "[]");
      console.log(styleText("green", "create new data file"));
    } else if (fs.existsSync(dataFilePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
        const itemsOk =
          Array.isArray(data) &&
          data.every(
            (item: unknown) =>
              !!item &&
              typeof item === "object" &&
              typeof (item as TodoItem).id === "string" &&
              typeof (item as TodoItem).value === "string" &&
              typeof (item as TodoItem).createAt === "string" &&
              typeof (item as TodoItem).updateAt === "string",
          );
        if (!itemsOk) {
          fs.writeFileSync(dataFilePath, "[]");
          console.log(
            styleText("yellow", "data file borken, create new data file"),
          );
        }
      } catch (error) {
        fs.writeFileSync(dataFilePath, "[]");
        console.log(
          styleText("yellow", "data file borken, create new data file"),
        );
      }
    }
    console.log(styleText("green", "data file exist"));
  } catch (error) {
    console.log(styleText("red", "data file error: "), error);
    process.exit(1);
  }
};

// actions
const actionsEnum = ["add", "read", "update", "delete"];

// 新增事項
const actionAdd = (input: string) => {
  if (input === "") {
    console.log(
      styleText(
        "red",
        "no input provided, order 'add' need a input value and be string",
      ),
    );
    process.exit(1);
  }
  console.log(styleText("blue", "add: "), input);
  makeSureDataFileWork();

  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const timeStamp = `${now.getFullYear()}${pad(now.getMonth())}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

  const newTodoItem: TodoItem = {
    id: timeStamp,
    value: input,
    createAt: new Date().toLocaleString(),
    updateAt: new Date().toLocaleString(),
  };

  try {
    const data = JSON.parse(
      fs.readFileSync(dataFilePath, "utf8"),
    ) as TodoItem[];
    const isIdExist = data.some((item) => item.id === newTodoItem.id);
    if (isIdExist) {
      console.log(styleText("red", "you adding too fast, wait for 1 second"));
      process.exit(1);
    }
    data.push(newTodoItem);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    console.log(styleText("green", "write data file success"));
    console.log(styleText("blue", "new todo item: "), newTodoItem);
  } catch (error) {
    console.log(styleText("red", "read data file failed: "), error);
    process.exit(1);
  }
};

// 讀取所有事項
const actionReadAll = () =>{
  try{
    const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8")) as TodoItem[];
    console.log(styleText("blue", "all todo items: "), data);
  } catch (error) {
    console.log(styleText("red", "read data file failed: "), error);
    process.exit(1);
  }
}
// 讀取單一事項

// 更新指定事項

// 刪除指定事項

// 清空所有事項

/* =============== 指令驗證 =============== */
// 確認行為指令是否合法
const actionValidator = (action: string) => {
  if (!actionsEnum.includes(action)) {
    console.log(styleText("red", "invalidated action, action must be one of:"));
    console.log(styleText("green", actionsEnum.join(", ")));
    process.exit(1);
  }
};

// 確認有行為指令
const checkActionExist = (positionals: string[]) => {
  if (positionals.length === 0) {
    console.log(styleText("red", "no action provided, action must be one of:"));
    console.log(styleText("green", actionsEnum.join(", ")));
    process.exit(1);
  }
};

/* =============== 執行指令 =============== */

// 接受到指令
const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    id: {
      type: "string",
      description: "id",
      short: "i",
    },
    value: {
      type: "string",
      description: "內容",
      required: true,
      short: "v",
    },
  },
});

// 確認有行為指令
checkActionExist(positionals);
// 驗證行為指令合法
positionals.forEach((action) => actionValidator(action));

// 建立指令物件
const order = {
  action: positionals[0],
  id: values.id || "",
  value: values.value || "",
};

// 根據指令呼叫對應函數並執行
switch (order.action) {
  case "add":
    actionAdd(order.value);
    break;
  case "read":
    actionReadAll();
    break;
  default:
    console.log("invalid action", order.action);
    process.exit(1);
}
