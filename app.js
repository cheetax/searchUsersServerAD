var config = require('./config');

var base = require('./routes/base');

var express = require('express')

var app = express();

app.use('/base', base)

app.get('/', function (req, res) {
    res.json({});
})

app.listen(4000)


