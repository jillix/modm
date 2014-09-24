var modm = require("../index");

var Schema = new modm.Schema({
    boolean: {
        type: Boolean,
        required: true,
        default: false
        //validate: function () {},
        //manipulate: function () {},
        //live: true
    }
});

var test1 = {
    boolean: true
};

module.exports = function(model, callback) {
    var document = model("boolean", Schema);
    document.insert(test1, callback);
};
