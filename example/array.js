var modm = require('../index');

var Schema = new modm.Schema({array: {
        
    type: Array

}});

var test1 = {array: []};

module.exports = function (db, callback) {
    var document = db.model('number', Schema);
    document.insert(test1, callback);
}
