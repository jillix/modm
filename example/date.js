var modm = require('../index');

var Schema = new modm.Schema({date: {

    type: Date,
    required: true,
    default: new Date()
    //validate: function () {},
    //manipulate: function () {},
    //live: true

}});

var test1 = {date: new Date()};

module.exports = function (model, callback) {
    var document = model('date', Schema);
    document.insert(test1, callback);
}
