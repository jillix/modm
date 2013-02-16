/*
// schema definition
schema = modm.schema({schemen: 'doch'});

// db connection settings and options
model = modm('crm2', {host: '', port: '', ..});

// collection
truckens = model('truckens', schema);

// connect and operation
truckens.insert({data: 1}, function () {});
*/

var modm = require('../index');

// TODO make an example for every type, with all options
var string = require('./string');
var number = require('./number');
var array = require('./array');
var object = require('./object');

// database connection
var model = modm('crm2', {server: {poolSize: 2}, db: {w: 1}});

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
