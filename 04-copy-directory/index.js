const fs = require("fs").promises;
const { type } = require("os");
const path = require("path");

const dirCur = path.join(__dirname, "files");
const dirCopy = path.join(__dirname, "files-copy");

async function copy() {
  try {
    await fs.access(dirCopy);
  } catch (error) {
    await fs.mkdir(dirCopy, { recursive: true });
  }

  const data = await fs.readdir(dirCur, { withFileTypes: true });

  for (let file of data) {
    await fs.copyFile(
      path.join(dirCur, file.name),
      path.join(dirCopy, file.name)
    );
  }
}
copy();
