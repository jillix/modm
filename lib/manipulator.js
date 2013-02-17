var Validator = require('./validator');

var Preparer = {
    
    validate: function (type, validate) {
        
        // validation info
        if (validate) {
            
            // find a validation method in Validator
            if (typeof validate === "string" && Validator[validate]) {
                validate = Validator[validate];
            }
            
            return validate;
        }
        
        // use the default type validator
        if (Validator[type]) {
            return Validator[type];
        }
    },
    
    default: function (validate, value) {
        
        // validate default value
        if (validate && !validate(value)) {
            throw new Error("Invalid default value.");
        }
        
        return value;
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
// TODO live (realtime, push)
// TODO required
// TODO max, min
exports.prepare = function (type, options) {
    
    // define default item
    var item = {type: type};
    
    // TODO mandatory attributes?
    item.validate = Preparer.validate(type, options.validate);
    item.default = options.default ? Preparer.default(item.validate, options.default) : null;
    
    return item;
};

exports.modify = function (type, document) {
    
    //console.log('MODIFY: ' + type);
    return document;
    
    /*for (var option in options) {
        
        if (Preparer[option]) {
            item[option] = Preparer[option](options[option]);
        }
    }*/
};
