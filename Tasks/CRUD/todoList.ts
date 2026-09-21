import { parseArgs, styleText } from "node:util";
// 接受到指令
const {values, positionals} = parseArgs({
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

// actions
const actionsEnum = ['add', 'read', 'update', 'delete'];
const actionValidator = (action: string) => {
    if (!actionsEnum.includes(action)) {
        console.log("invalidated action, action must be one of:");
        console.log(styleText("green", actionsEnum.join(", ")));
        process.exit(1);
    }
    console.log("valid action", action);
}

positionals.forEach((action) => actionValidator(action));

console.log(values, positionals);
