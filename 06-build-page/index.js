const fs = require("fs").promises;
const path = require("path");

const templatePath = path.join(__dirname, "template.html");
const componentsPath = path.join(__dirname, "components");

async function createFolder() {
  await fs.mkdir("project-dist", { recursive: true });
}

async function createHtml() {
  const template = await fs.readFile(templatePath, "utf-8");
  const comps = await fs.readdir(componentsPath);
  let data = template;
  for (let com of comps) {
    let tagname = com.split(".")[0];
    let tag = await fs.readFile(path.join(componentsPath, `${com}`), "utf-8");

    data = await data.replace(`{{${tagname}}}`, tag);
  }
  await fs.writeFile(path.join(__dirname, "project-dist", "index.html"), data);
}
async function copy(src, dist) {
  await fs.access(src);
  await fs.mkdir(dist, { recursive: true });
  const data = await fs.readdir(src, { withFileTypes: true });
  for (const file of data) {
    if (file.isDirectory()) {
      await copy(path.join(src, file.name), path.join(dist, file.name));
    } else {
      await fs.copyFile(path.join(src, file.name), path.join(dist, file.name));
    }
  }
}

async function bundle() {
  const files = await fs.readdir(path.join(__dirname, "styles"), {
    withFileTypes: true,
  });

  let bundle = "";
  for (let file of files) {
    if (path.extname(file.name) === ".css") {
      let filePath = path.join(path.join(__dirname, "styles"), file.name);
      let data = await fs.readFile(filePath, "utf-8");
      bundle += data;
    }
  }
  await fs.writeFile(path.join(__dirname, "project-dist", "style.css"), bundle);
}

async function compile() {
  await createFolder();
  await copy(
    path.join(__dirname, "assets"),
    path.join(__dirname, "project-dist", "assets")
  );
  await bundle();
  await createHtml();
}
compile();
