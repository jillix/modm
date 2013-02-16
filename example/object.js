var modm = require('../index');

var Schema = new modm.Schema({object: {
        
    type: Object

}});

var test1 = {object: {}};

module.exports = function (db, callback) {
    var document = db.model('number', Schema);
    document.insert(test1, callback);
}
