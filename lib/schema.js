var Validator = require('./validator');

// class Schema
function Schema (obj, options) {
    
    if (obj.constructor.name !== 'Object') {
        return null;
    }
    
    this.paths = {};
    this.add(obj);
};

// add paths to schema
Schema.prototype.add = function (obj, prefix) {
    
    prefix = prefix || '';
    
    for (var key in obj) {
        
        if (obj[key] === null) {
            throw new TypeError('Invalid value for schema path `' + prefix + key + '`');
        }
        
        // check if obj[key] is an object and not a type with options
        if (obj[key].constructor.name === 'Object' && typeof obj[key].type === "undefined") {
            
            // handle nested objects
            if (Object.keys(obj[key]).length) {
                
                //this.nested[prefix + key] = true;
                this.add(obj[key], prefix + key + '.');
                
            } else {
                path.call(this, prefix + key, obj[key]);
            }
        
        } else {
            path.call(this, prefix + key, obj[key]);
        }
    }
};

// create schema item
// TODO pre, post, ???, ...
// TODO realtime options
function path (path, obj) {
    
    var type = typeof obj.type === 'undefined' ? obj : obj.type;
    var name = (type.name || type.constructor.name).toLowerCase();
    var item = {type: name};
    
    // remember indexes
    if (obj.index) {
        
        if (!this.indexes) {
            this.indexes = [];
        }
        
        var index = [[path]];
        
        if (typeof obj.index === 'object') {
            index[1] = obj.index;
        }
        
        this.indexes.push(index);
        item.index = obj.index;
    }
    
    // validation info
    if (obj.validate) {
        
        // find a validation method in Validator
        if (typeof obj.validate === "string" && Validator[obj.validate]) {
            obj.validate = Validator[obj.validate];
        }
        
        item.validate = obj.validate;
    
    // default validator
    } else if (Validator[name]) {
        item.validate = Validator[name];
    }
    
    // default value
    if (typeof obj.default !== 'undefined') {
        
        // validate default value
        if (item.validate && !item.validate(obj.default)) {
            throw new Error("Invalid default value.");
        }
        
        item.default = obj.default;
    }
    
    this.paths[path] = item;
};

module.exports = Schema;
