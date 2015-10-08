var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:name', function (req, res, next) {
    console.log(req.params.name);
    res.send(req.params.name);
});

module.exports = router;