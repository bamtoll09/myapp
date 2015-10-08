var express = require('express');
var router = express.Router();
module.exports = router;

//db setting
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var user;

var db = mongoose.connection;

db.once('open', function () {
    var userSchema = mongoose.Schema({
        id: String,
        pw: String
    });
    
    user  = mongoose.model('user', userSchema);
});

var logSet = function (req, res, next) {
    req.session.regenerate(function(){
        req.session.logined = false;
        req.session.logId = '';
        next();
    });
};

var err = new Error('404');

router.post('/login', function (req, res) {
    console.log(req.body);
    user.find({ id: req.body.id }, function (err, docs) {
        if (docs.length == 0) {
            err = new Error('304');
            err.status = 304;
        } else {
            if (docs[0].pw == req.body.pw) {
                req.session.logined = true;
                req.session.logId = docs._id;
                res.json({
                    id: docs.id,
                    pw: docs[0].pw,
                    _id: docs._id
                    
                });
            } else {
                err = new Error('404');
                err.status = 404;
            }
        }
    });
});

router.post('/logout', logSet, function (req, res) {
    res.json({
        log: '로그아웃 되었습니다.'
    });
});

router.post('/signup', function (req, res) {
    console.log(req.body);
    user.findOne({ id: req.body.id }, function (err, doc) {
        if (!doc) {
            if (req.body.pw == req.body.confirm) {
                var User = new user ({
                    id: req.body.id,
                    pw: req.body.pw
                });
                
                User.save();
                res.json({
                    log: '회원가입에 성공하였습니다'
                });
            } else {
                err = new Error('403');
                err.status = 403;
            }
        } else {
            err = new Error('304');
                err.status = 304;
        }
    });
});