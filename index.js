const {styleText} = require('node:util')
const path = require('path');
const fs = require('fs');


fs.readFile('./files/starter.txt', (err,data) => {
    if(err) throw err;
    console.log(styleText('red',data.toString()));
})
console.log('ehllo')
fs.readFile('./files/starter.txt','utf8', (err,data) => {
    if(err) throw err;
    console.log(data);
})

//exit on uncaught errors
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error : ${err}`);
    process.exit(1);
})