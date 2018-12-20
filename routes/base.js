var express = require('express');
var router = express.Router();

var base = require('../services/base');
// define the home page route

router.get('/', async (req, res) => {
    let _base = await base.getBase()
    res.json(_base)
});

module.exports = router;