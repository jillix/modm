var _String = require('./string');
var _Number = require('./number');
var _Array = require('./array');
var _Object = require('./object');

var modm = require('../index');
modm.setOptions({server: {poolSize: 2}, db: {w: 1}});
modm.connect('crm2', function (err, db) {
    
    // TODO make an example for every type, with all options
    
    // string
    var strings = db.model('dev', _String);
    strings.insert({string: ''}, function () {
        console.log(arguments);
    });
    
    // number
    var numbers = db.model('dev', _Number);
    numbers.insert({number: 1}, function () {
        console.log(arguments);
    });
    
    // array
    var arrays = db.model('dev', _Array);
    arrays.insert({array: []}, function () {
        console.log(arguments);
    });
    
    // object
    var objects = db.model('dev', _Object);
    objects.insert({object: {}}, function () {
        console.log(arguments);
    });
});
