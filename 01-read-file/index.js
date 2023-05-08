const fs = require("fs");
const path = require("path");

let textPath = path.join(__dirname, "text.txt");
const stream = fs.createReadStream(textPath, "utf-8");

let data = "";
stream.on("data", (chunk) => console.log((data += chunk)));
stream.on("error", (error) => console.log("Error", error.message));
