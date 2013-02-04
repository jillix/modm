var Validator = require('./validator');

var Preparer = {
    
    validate: function (name, validate) {
        
        // validation info
        if (validate) {
            
            // find a validation method in Validator
            if (typeof validate === "string" && Validator[validate]) {
                validate = Validator[validate];
            }
            
            return validate;
        }
        
        // get default validator
        if (Validator[name]) {
            return Validator[name];
        }
    }
};

var Manipulator = {
    
    pre: function (valueA, valueB) {
        
        return valueB + valueA;
    },
    
    post: function (valueA, valueB) {
        
        return valueA + valueB;
    },
    
    max: function () {},
        
    min: function () {}
};

// TODO pre, post
// TODO realtime options
// TODO required
// TODO max, min
exports.prepare = function (type, options) {
    
    console.log('PREPARE: ' + type);
    //return options;
    
    var item = {type: type};
    
    // validation info
    if (options.validate) {
        
        // find a validation method in Validator
        if (typeof options.validate === "string" && Validator[options.validate]) {
            options.validate = Validator[options.validate];
        }
        
        item.validate = options.validate;
        
    // default validator
    } else if (Validator[type]) {
        item.validate = Validator[type];
    }
    
    // default value
    if (typeof options.default !== 'undefined') {
        
        // validate default value
        if (item.validate && !item.validate(options.default)) {
            throw new Error("Invalid default value.");
        }
        
        item.default = options.default;
    }
    
    return item;
    
    /*var item = {};
    
    for (var option in options) {
        
        if (Preparer[option]) {
            item[option] = Preparer[option](options[option]);
        }
    }
    
    return item;*/
};

exports.modify = function (type, document) {
    
    console.log('MODIFY: ' + type);
    return document;
    
    /*for (var option in options) {
        
        if (Preparer[option]) {
            item[option] = Preparer[option](options[option]);
        }
    }*/
};
