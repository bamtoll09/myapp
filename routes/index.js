var express = require('express');
var router = express.Router();
module.exports = router;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Index',
        name: 'あららぎ 月日'
    });
    /*var ua = req.headers['user-agent'];
    console.log(req.headers);*/
    console.log(req.connection.remoteAddress + ' connected');
});
