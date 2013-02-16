var modm = require('../index');

var Schema = new modm.Schema({number: {
        
    type: Number

}});

var test1 = {number: 1};

module.exports = function (db, callback) {
    var document = db.model('number', Schema);
    document.insert(test1, callback);
}
