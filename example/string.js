var modm = require('../index');

var Schema = new modm.Schema({string: {
        
    type: String,
    required: true,
    pre: '  tru',
    post: 'cken  ',
    charStyle: 'uppercase', // normal | uppercase | lowercase
    trim: true,
    default: 'default',
    validate: function (value) {
        return true;
    },
    manipulate: function (value) {
        return value;//'this is a manipulated value. and this is the original value: ' + value;
    }
    //live: true

}}, [{
    fields: ['string']
}]);

var test1 = {string: ''};

module.exports = function (model, callback) {
    var document = model('string', Schema);
    
    document.insert(test1, callback);
    
    console.log('STRING FIND: ' + typeof document.find());
}
