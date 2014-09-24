var modm = require("../index");

var Schema = new modm.Schema({array: {

    type: Array,
    required: true,
    default: ["a", "b"],
    //validate: function () {},
    //manipulate: function () {},
    //live: true,

    // INFO only the input gets validated, not the result of an atomic operation
    maxLength: 5,
    minLength: 1

}});

var test1 = {array: ["1", "2", "3"]};

module.exports = function (model, callback) {
    var document = model("array", Schema);
    document.insert(test1, callback);
};
