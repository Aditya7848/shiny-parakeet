const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}
//initialize object
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  let p;

  // if (req.url === "/" || req.url === "index.html") {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/html");
  //   p = path.join(__dirname, "views", "index.html");
  //   fs.readFile(p, "utf8", (err, data) => {
  //     res.end(data);

  //   });
  // }
  switch(req.url){
    case '/':{
      res.statusCode = 200;
      res.setHeader = ('Content-Type','text/html');
      let p = path.join(__dirname, 'views', 'index.html')
      fs.readFile(p, 'utf8', (err, data) => {
        res.end(data)
      })
      break;
    }
  }
  
});

server.listen(PORT, () => console.log("server listening in on 3500"));
// myEmitter.on("log", (msg) => logEvents(msg));
//   myEmitter.emit("log", "log event emitted!");
