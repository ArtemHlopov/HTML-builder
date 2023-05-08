const { stdin, stdout } = process;
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "text.txt");

const output = fs.createWriteStream(filePath);

console.log("Введите текст:");

stdin.on("data", (data) => {
  const text = data.toString();

  if (text.trim() === "exit") {
    output.close();
    console.log("Прощай");
    process.exit();
  } else {
    output.write(`${text}`);
  }
});

process.on("SIGINT", function () {
  output.close();
  stdout.write("Прощай!");
  process.exit();
});
