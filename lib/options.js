var Validator = require('./validator');

function checkString (string) {

    if (typeof string === 'string') {
        return string;
    }

    return string.toString();
}

function toNumber (number) {

    if (typeof number === 'number') {
        return number;
    }

    if (typeof number === 'string' && number.match(/\./)) {
        return parseFloat(number, 10) || 0;
    }

    return parseInt(number, 10) || 0;
}

function checkLength (integer) {

    integer = parseInt(integer, 10) || 0;
    return integer < 0 ? 0 : integer;
}

function validate (type, validate) {

    // validation info
    if (typeof validate === 'function') {
        return validate;
    }

    // find a validation method in Validator
    if (typeof validate === "string") {

        if (Validator[validate]) {
            return Validator[validate];
        }
    }

    // use the default type validator
    if (Validator[type]) {
        return Validator[type];
    }

    console.error("No validation method found.");
}

function validateDefault (validate, value) {

    // validate default value
    if (validate && !validate(value)) {
       return  console.error("Invalid default value.");
    }

    return value;
}

function toBoolean (value) {
    return value ? true : false;
}

// type options
var options = {

    required: toBoolean,
    live: toBoolean,

    manipulate: function (value) {
        return typeof value === 'function' ? value : null;
    },

    charStyle: function (value) {

        value = value.toLowerCase();

        if (value === 'lowercase') {
            return 'toLowerCase';
        }

        if (value === 'uppercase') {
            return 'toUpperCase';
        }

        return null;
    },

    trim: toBoolean,
    pre: checkString,
    post: checkString,
    maxLength: checkLength,
    minLength: checkLength,
    max: toNumber,
    min: toNumber
};

// schema (return options)
exports.prepare = function (opts) {

    // define default item
    var _options = opts;

    // prepare options
    for (var fn in options) {
        if (typeof opts[fn] !== 'undefined') {
            _options[fn] = options[fn](opts[fn]);
        }
    }

    // special preparers
    _options.validate = validate(opts.type, opts.validate);
    _options.default = opts.default ? validateDefault(_options.validate, opts.default) : null;

    return _options;
};
