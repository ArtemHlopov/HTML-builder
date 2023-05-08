var fs = require("fs");
var path = require("path");

const folderPath = path.join(__dirname, "secret-folder");
fs.readdir(folderPath, { withFileTypes: true }, (error, data) => {
  if (error) {
    console.log(error);
  }
  data.forEach((el) => {
    if (el.isFile()) {
      console.log(
        `${el.name.split(".")[1]} - ${path.extname(el.name)} - ${
          fs.statSync(`${folderPath}/${el.name}`).size / 1000
        } kb`
      );
    }
  });
});
