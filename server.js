const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
const { response } = require("express");
class Emitter extends EventEmitter {}
//initialize object
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, res) => {
  try {if(fs.existsSync(path.join(__dirname, 'files'))){
    fs.mkdir(path.join(__dirname, 'files'))
}
    const data = await fsPromises.readFile(filePath, 
      contentType === ('image/jpeg' || 'image/png') ? "" :  "utf8");
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  const extention = path.extname(req.url);

  let contentType;

  switch (extention) {
    case ".css": 
      contentType = "text/css";
      break;
    
    case ".js": 
      contentType = "text/javascript";
      break;
    
    case ".json": 
      contentType = "application/json";
      break;
    
    case ".jpg": 
      contentType = "image/jpeg";
      break;
    
    case ".png": 
      contentType = "image/png";
      break;
    
    case ".txt": 
      contentType = "text/plain";
      break;
    
    default: 
      contentType = "text/html";
    
  }

  let filePath =
    contentType === "text/html" && req.url == "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  //makes the .html extention not required in the browser
  if (!extention && req.url.slice(-1) != "/") {
    filePath += ".html";
  }

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    serveFile(filePath, contentType, res);
    // fs.readFile(filePath, "utf8", (err, data) => {
    //   res.status = 200;
    //   res.setHeader = contentType;
    //   res.end(data);
    // })
  } else {
    // console.log(path.parse(filePath))
    // res.status = 404;
    // res.end();
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { 'Location': "/new-page.html" });
        res.end();
        break;

      case "www-page.html":
        res.writeHead(301, { 'Location': "/" });
        res.end();
        break;
      default:
        //serve 404 response
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => console.log("server listening in on 3500"));
myEmitter.on("log", (msg) => logEvents(msg));
myEmitter.emit("log", "log event emitted!");
