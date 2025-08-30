const { styleText } = require("node:util");
const path = require("path");
const fsPromise = require("fs").promises;

const fileOps = async () => {
  try {
    const data = await fsPromise.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);

    await fsPromise.unlink(path.join(__dirname, "files", "starter.txt"));
    await fsPromise.writeFile(path.join(__dirname, "files", "promiseWrite.txt"), data);
    await fsPromise.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "fist append."
    );
    await fsPromise.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseComplete.txt")
    );
    const newData = await fsPromise.readFile(
      path.join(__dirname, "files", "promiseComplete.txt"),
      "utf8"
    );
    console.log("newData = ", newData);
  } catch (err) {
    console.log(err);
  }
};

fileOps();


//exit on uncaught errors
process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error : ${err}`);
  process.exit(1);
});
