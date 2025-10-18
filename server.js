const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const errorHandler = require("./middlewares/errorHandler");
const logEvents = require("./middlewares/logEvents");
const corsOptions = require('./config/corsOptions')

const PORT = process.env.PORT || 3500;

//!custom middleware
app.use((req, res, next) => {
  logEvents(`${req.method}\t ${req.headers.origin}\t ${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
});

//!CORS
app.use(cors(corsOptions));

//!middlewares.......
//built-in middleware to handle urlencoded data in other words, form data:'content-type:application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//!making Router seperately using express.Router()
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/api/register'));
app.use('/auth', require('./routes/api/auth'));
app.use('/employee', require('./routes/api/employees'));


//~the above code block is getting changed to app.all
app.all(/\^*$/, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

//!error handling.....
app.use(errorHandler);

app.listen(PORT, () => console.log("server listening in on 3500"));
