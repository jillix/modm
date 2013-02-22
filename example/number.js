var modm = require('../index');

var Schema = new modm.Schema({number: {
        
    type: Number,
    required: true,
    max: 5,
    min: -3,
    default: 0
    //validate: function () {},
    //manipulate: function () {},
    //live: true

}});

var test1 = {number: 1};

module.exports = function (model, callback) {
    var document = model('number', Schema);
    document.insert(test1, callback);
}
