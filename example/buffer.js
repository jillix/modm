var modm = require('../index');

var Schema = new modm.Schema({buffer: {
        
    type: Buffer,
    required: true,
    default: new Buffer('buffer data'),
    maxLength: 512,
    minLength: 128
    //validate: function () {},
    //manipulate: function () {},
    //live: true

}});

var test1 = {buffer: new Buffer(0)};

module.exports = function (model, callback) {
    var document = model('buffer', Schema);
    document.insert(test1, callback);
}
