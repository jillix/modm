// INFO: results of atomic operations are not validated.
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
    }
};

var validators = {
    
    maxLength: function (length, value) {
        
        if (value.length) {
            return value.length <= length ? true : false;
        }
    },
    
    minLength: function (length, value) {
        
        if (value.length) {
            return value.length >= length ? true : false;
        }
    },
    
    max: function (optValue, value) {
        
        if (typeof value === 'number') {
            return value <= optValue ? true : false;
        }
    },
    min: function (optValue, value) {
        
        if (typeof value === 'number') {
            return value >= optValue ? true : false;
        }
        return false;
    },
}

// adapter (return document)
module.exports = function (options, value) {
    
    var result;
    
    // manipulators
    for (var manipulator in manipulators) {
        
        if (options[manipulator]) {
            
            result = manipulators[manipulator](options[manipulator], value);
            
            if (result[0]) {
                return result;
            }
            
            value = result[1];
        }
    }
    
    // manipulate
    if (typeof options.manipulate === 'function') {
        value = options.manipulate(value);
    }
    
    // validate
    for (var validator in validators) {
        
        if (typeof options[validator] !== 'undefined') {
            
            if (!validators[validator](options[validator], value)) {
                return ['Validation failed: ' + options[validator] + ' | value: ' + value.toString()];
            }
        }
    }
    
    if (typeof options.validate === 'function') {
        
        if (!options.validate(value)) {
            return ['Validation failed: ' + value.toString()];
        }
        
    } else if (options.validate && Validator[options.validate]) {
        
        if (!Validator[options.validate](value)) {
            return ['Validation failed: ' + options.validate + ' | value: ' + value.toString()];
        }
    }
    
    return [null, value];
};
