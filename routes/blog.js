http://blog.naver.com/6912sinjagro
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.redirect('http://blog.naver.com/6912sinjagro');
});

module.exports = router;