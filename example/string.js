var modm = require('../index');

module.exports = new modm.Schema({string: {
        
    type: String,
    required: true,
    pre: 'tru',
    post: 'cken',
    //validate: function () {}

}});
