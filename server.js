
/*
const express = require('express');
var app = express();
app.use(static(__dirname));
app.listen('3300');
console.log('Running at\nhttp://localhost:3300');
*/

const express = require('express');
const app = express();
const port = 3000;

app.get('/', function (req, res) {
  res.sendFile('test.html', { root: __dirname })
});

app.listen(port);