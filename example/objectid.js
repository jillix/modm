// TODO define objectid options
var modm = require('../index');
var ObjectID = require('../node_modules/pongo/node_modules/mongodb').ObjectID;

var Schema = new modm.Schema({objectid: {

    type: ObjectID,
    required: true,
    default: new ObjectID()
    //validate: function () {},
    //manipulate: function () {},
    //live: true

}});

var test1 = {objectid: new ObjectID()};

module.exports = function (model, callback) {
    var document = model('objectid', Schema);
    document.insert(test1, callback);
}
