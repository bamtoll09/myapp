var express = require('express');
var router = express.Router();
module.exports = router;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hospitals');

var hospitalSchema = mongoose.Schema({
    name: { type: String },
    lat: { type: String },
    long: { type: String },
    address: { type: String },
    tel: { type: String },
    rev[0].text: { type: String },
    rev[1].text: { type: String },
    rev[2].text: { type: String }
});
    
var hospital  = mongoose.model('hospital', hospitalSchema);

router.get('/info', function(req, res) {
    hospital.find({}, function(err, docs) {
        res.json({
            name: docs.name,
            lat: docs.lat,
            long: docs.long,
            address: docs.address,
            tel: docs.tel,
            rev1: docs.rev[0].text,
            rev2: docs.rev[1].text,
            rev3: docs.rev[2].text
        });
    });
});