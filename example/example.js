var modm = require('../index');

// TODO make an example for every type, with all options
var string = require('./string');
var number = require('./number');
var array = require('./array');
var object = require('./object');
var boolean = require('./boolean');
var buffer = require('./buffer');
var objectid = require('./objectid');
var date = require('./date');

// database connection
var model = modm('crm2', {
    autoIndex: true,
    server: {poolSize: 2},
    db: {w: 1}
});

// string
string(model, function (err, result) {
    console.log(err || result);
});

// number
number(model, function (err, result) {
    console.log(err || result);
});

// array
array(model, function (err, result) {
    console.log(err || result);
});

// object
object(model, function (err, result) {
    console.log(err || result);
});

// boolean
boolean(model, function (err, result) {
    console.log(err || result);
});

// buffer
buffer(model, function (err, result) {
    console.log(err || result);
});

// objectid
objectid(model, function (err, result) {
    console.log(err || result);
});

// date
date(model, function (err, result) {
    console.log(err || result);
});
