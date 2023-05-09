const fs = require("fs").promises;
const path = require("path");

const curPath = path.join(__dirname, "styles");
const newPath = path.join(__dirname, "project-dist", "bundle.css");

async function bundle() {
  const files = await fs.readdir(curPath, { withFileTypes: true });

  let bundle = "";
  for (let file of files) {
    if (path.extname(file.name) === ".css") {
      let filePath = path.join(curPath, file.name);
      let data = await fs.readFile(filePath, "utf-8");
      bundle += data;
    }
  }
  await fs.writeFile(newPath, bundle);
}
bundle();
