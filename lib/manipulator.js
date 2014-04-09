// INFO: results of atomic operations are not validated.
var convert = require('./convert');
var Validator = require('./validator');

var manipulators = {

    pre: function (optValue, value) {
        return [null, (optValue + value)];
    },

    post: function (optValue, value) {
        return [null, (value + optValue)];
    },

    charStyle: function (style, value) {
        return [null, (style && value[style] ? value[style]() : value)];
    },

    trim: function (optValue, value) {
        return [null, (optValue ? value.trim() : value)];
    },

    maxLength: function (length, value) {

        if (value.length && value.length <= length) {
            return [null, value];
        }

        return ['Validation maxLength failed'];
    },

    minLength: function (length, value) {

        if (value.length && value.length >= length) {
            return [null, value];
        }

        return ['Validation minLength failed'];
    },

    max: function (optValue, value) {

        if (typeof value === 'number' && value <= optValue) {
            return [null, value];
        }

        return ['Validation max failed'];
    },
    min: function (optValue, value) {

        if (typeof value === 'number' && value >= optValue) {
            return [null, value];
        }

        return ['Validation min failed'];
    }
}

// adapter (return document)
module.exports = function (options, value, path) {

    var result;

    // convert type
    value = convert(options, value);
    if (value && value.constructor.name === 'Error') {
        return [value.toString()];
    }

    // manipulators
    for (var manipulator in manipulators) {

        if (manipulator in options) {

            result = manipulators[manipulator](options[manipulator], value);

            if (result[0]) {
                return result;
            }

            value = result[1];
        }
    }

    // custom manipulator
    if (typeof options.manipulate === 'function') {
        value = options.manipulate(value);
    }

    // validate
    for (var validator in Validator) {

        if (typeof options[validator] !== 'undefined') {
            if (!Validator[validator](options[validator], value)) {
                return ['Validation failed: ' + options[validator] + ' | value: ' + (value ? value.toString() : value)];
            }
        }
    }

    // schema or custom validation function
    if (typeof options.validate === 'function') {

        if (!options.validate(value)) {
            return ['Schema validation failed: ' + path + ' expected ' + options.type + " but got " + (value ? value.toString() : value)];
        }

    } else if (options.validate && Validator[options.validate]) {

        if (!Validator[options.validate](value)) {
            return ['Validation failed: ' + options.validate + ' | value: ' + (value ? value.toString() : value)];
        }
    }

    return [null, value];
};
