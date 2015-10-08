/*var express = require('express');
var router = express.Router();
var io = require('socket.io').listen(3000);

module.exports = router;

var isLogined = function (req, res, next) {
    if (req.session.logined) {
        next();
    } else {
        res.json({
            log: '로그인해주시기 바랍니다.'
        });
    }
};

router.post('/', isLogined, function (req, res) {
    res.render('chat', {
        title: 'Chatting'
    });
});*/