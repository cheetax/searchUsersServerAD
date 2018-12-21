var config = require('./config');
var base = require('./routes/base');
var express = require('express');
var cors = require('cors');

var app = express();

var corsOptions = {
    origin: (origin, callback) => {
        callback(null, origin)
    },
    credentials: true
}

app.use(cors(corsOptions));

app.use('/base', base)

app.get('/', function (req, res) {
    res.json({});
})

app.listen(4000)