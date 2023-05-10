const fs = require("fs").promises;
const path = require("path");

const dirCur = path.join(__dirname, "files");
const dirCopy = path.join(__dirname, "files-copy");

async function copy(src, dist) {
  try {
    await fs.access(destDir);
  } catch (error) {
    await fs.mkdir(dirCopy, { recursive: true });
  }

  const data = await fs.readdir(src, { withFileTypes: true });
  for (const file of data) {
    if (file.isDirectory()) {
      await copy(path.join(src, file.name), path.join(dist, file.name));
    } else {
      await fs.copyFile(path.join(src, file.name), path.join(dist, file.name));
    }
  }
}
async function clearDir() {
  try {
    await fs.rm(dirCopy, { recursive: true });
  } catch (error) {
    return;
  }
}
clearDir();
copy(dirCur, dirCopy);
