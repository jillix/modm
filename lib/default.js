// handle special default values
var types = {
    date: function (value) {
        if (value === 'now') {
            return new Date().getTime();
        }

        return value;
    }
};


function handleValue (type, value) {
    if (types[type]) {
        return types[type](value);
    }

    return value;
}

module.exports = handleValue;

