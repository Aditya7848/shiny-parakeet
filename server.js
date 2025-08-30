const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('hello from server...');
})


app.listen(3000, () => {
    console.log('server is listening in on server 3000.')
})