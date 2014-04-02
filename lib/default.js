var convert = require('./convert');

// handle special default values
var types = {
    date: function (value) {
        if (value === 'now') {
            return new Date().getTime();
        }

        return value;
    }
};

// TODO handle validation
function handleValue (type, value) {

    if (types[type]) {
        value = types[type](value);
    }

    return convert(type, value);
}

module.exports = handleValue;

