var convert = require("./convert");

// handle special default values
var types = {
    date: function(value) {
        if (value === "now") {
            return new Date();
        }

        return value;
    }
};

// TODO handle validation
function handleValue(options, value) {

    if (types[options.type]) {
        value = types[options.type](value);
    }

    return convert(options, value);
}

module.exports = handleValue;
