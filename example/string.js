var modm = require('../index');

var Schema = new modm.Schema({string: {
        
    type: String,
    required: true,
    pre: 'tru',
    post: 'cken',
    //validate: function () {}

}});

var test1 = {string: ''};

module.exports = function (db, callback) {
    var document = db.model('string', Schema);
    document.insert(test1, callback);
}
