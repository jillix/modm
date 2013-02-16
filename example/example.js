// TODO make an example for every type, with all options
var string = require('./string');
var number = require('./number');
var array = require('./array');
var object = require('./object');

var modm = require('../index');
modm.setOptions({server: {poolSize: 2}, db: {w: 1}});
modm.connect('crm2', function (err, db) {
    
    if (err) {
        throw err;
    }
    
    // string
    string(db, function (err, result) {
        console.log(err || result);
    });
    
    // number
    number(db, function (err, result) {
        console.log(err || result);
    });
    
    // array
    array(db, function (err, result) {
        console.log(err || result);
    });
    
    // object
    object(db, function (err, result) {
        console.log(err || result);
    });
});
