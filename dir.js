const fs = require('fs');


if(!fs.existsSync('./new')){
    fs.mkdir("./new", (err) => {
      if (err) throw err;
      console.log("directory creaated.");
    });
}
if(fs.existsSync('./new')){
    fs.rmdir("./new", (err) => {
      if (err) throw err;
      console.log("directory removed.");
    });
}


process.on('uncaughtException', (err) => {
    console.error(`there is an uncaught Exception.${err.message}`)
})