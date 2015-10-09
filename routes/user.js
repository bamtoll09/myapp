var express = require('express');
var router = express.Router();
module.exports = router;

//db setting
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');

var userSchema = mongoose.Schema({
    id: {type: String},
    pw: {type: String}
});
    
var user  = mongoose.model('user', userSchema);

router.post('/login', function (req, res) {
    user.find({ id: req.body.id }, function (err, docs) {
        if (docs.length == 0) {
            res.send(304);
        } else {
            if (docs[0].pw == req.body.pw) {
                res.json({
                    log: '로그인 되었습니다.'
                });
                console.log(req.body);
            } else {
                res.send(404);
            }
        }
    });
});

router.post('/logout', function (req, res) {
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
                console.log(req.body);
                res.json({
                    log: '회원가입에 성공하였습니다'
                });
            } else {
                res.send(403);
            }
        } else {
                res.send(304);
        }
    });
});