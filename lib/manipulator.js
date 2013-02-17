var Validator = require('./validator');
var types = {
    array: require('./types/array'),
    boolean: require('./types/boolean'),
    buffer: require('./types/buffer'),
    date: require('./types/date'),
    number: require('./types/number'),
    object: require('./types/object'),
    objectid: require('./types/objectid'),
    string: require('./types/string')
};

var globalPreparers = {
    
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

// schema (return options)
exports.prepare = function (options) {
    
    console.log(options);
    
    if (types[options.type] && typeof types[options.type].prepare === 'function') {
        options = types[options.type].prepare(options);
    }
    
    // define default item
    var _options = {type: options.type};
    
    // TODO global preparers
    _options.validate = globalPreparers.validate(options.type, options.validate);
    _options.default = options.default ? globalPreparers.default(_options.validate, options.default) : null;
    
    return _options;
};

// adapter (return document)
exports.modify = function (options, document) {
    
    if (types[options.type] && typeof types[options.type].modify === 'function') {
        document = types[options.type].modify(options, document);
    }
    
    //console.log(options);
    return document;
};
