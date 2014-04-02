var modm = require('../index');

var Schema = new modm.Schema({object: {

    type: Object,
    required: true,
    default: {a: 'b'}
    //validate: function () {},
    //manipulate: function () {},
    //live: true

}});

var test1 = {object: {}};

module.exports = function (model, callback) {
    var document = model('object', Schema);
    document.insert(test1, callback);
}
