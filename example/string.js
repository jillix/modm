var modm = require('../index');

var Schema = new modm.Schema({string: {
        
    type: String,
    required: true,
    pre: 'tru',
    post: 'cken',
    charStyle: 'normal', // normal | uppercase | lowercase
    trim: true,
    default: 'default'
    //validate: function () {},
    //manipulate: function () {},
    //live: true

}}, [{
    fields: ['string']
}]);

var test1 = {string: ''};

module.exports = function (model, callback) {
    var document = model('string', Schema);
    document.insert(test1, callback);
}
