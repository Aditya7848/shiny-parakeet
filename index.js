const { styleText } = require("node:util");
const path = require("path");
const fs = require("fs");

console.log(path.join(__dirname, "files", "starter.txt"));

console.log("ehllo");

fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "This is from writeFile function callback...",
  (err) => {
    if (err) throw err;
    console.log("write complete...");

    fs.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      "\n\nthis appending is from appendFile...",
      (err) => {
        if (err) throw err;
        console.log("appending complete...");

        fs.rename(
          path.join(__dirname, "files", "reply.txt"),
          path.join(__dirname, "files", "newRenamingReply.txt"),
          (err) => {
            if (err) throw err;
            console.log("renaming complete...");
          }
        );
      }
    );
  }
);

fs.readFile(
  path.join(__dirname, "files", "newRenamingReply.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);

//exit on uncaught errors
process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error : ${err}`);
  process.exit(1);
});
