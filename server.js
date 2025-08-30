// You should already know:
// HTML, CSS, and Javascript
// Possibly experience with other libraries and frameworks


// How NodeJS differs from Vanilla JS
// 1) Node runs on a server - not in a browser (backend not frontend)
// 2) The console is the terminal window
// console. log( 'Hello World')
// 3) global object instead of window object
// console. log (global) ;
// 4) Has Common Core modules that we will explore
// 5) CommonJS modules (require) instead of ES6 modules (import)
// 6) Missing some Js APIs like fetch 

// const os = require('os');
// const path = require('path')
// const math = require('./math.js')
const { add, subtract, multiply, divide } = require("./math.js");

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())


// console.log(__dirname)
// console.log(__filename)

// console.log(path.dirname(__filename))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))

// console.log(path.parse(__filename))

// console.log(math.add(55,44));
// console.log(math.divide(20,4));
// console.log(math.multiply(5,4));
// console.log(math.subtract(5, 1));

console.log(add(55,44));
console.log(divide(20,4));
console.log(multiply(5,4));
console.log(subtract(5, 1));