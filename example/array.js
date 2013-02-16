var modm = require('../index');

var Schema = new modm.Schema({array: {
        
    type: Array

}});

var test1 = {array: []};

module.exports = function (model, callback) {
    var document = model('array', Schema);
    document.insert(test1, callback);
}
