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

router.post('/login', function (req, res) {
    console.log(req.body);
    if (req.session.logined) {
        res.json({
            log: '이미 로그인 되어있습니다.'
        });
    } else {
    user.find({ id: req.body.id }, function (err, docs) {
        if (docs.length == 0) {
            res.json({
                log: '존재하지 않는 아이디입니다'
            });
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
                res.json({
                    log: '비밀번호가 잘못되었습니다.'
                });
            }
        }
    });
    }
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
                res.json({
                    log: '비밀번호를 확인해주세요'
                });
            }
        } else {
            res.json({
                log: '이미 사용중인 이메일입니다.'
            });
        }
    });
});