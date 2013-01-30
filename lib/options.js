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
    }
};

exports.prepare = function (options) {
    
    var item = {};
    
    for (var option in options) {
        
        if (Preparer[option]) {
            item[option] = Preparer[option](options[option]);
        }
    }
    
    return item;
};

exports.modify = function (options, value) {
    
    for (var option in options) {
        
        if (Preparer[option]) {
            item[option] = Preparer[option](options[option]);
        }
    }
};
