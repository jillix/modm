var Validator = require('./validator');

// class Schema
function Schema (obj, indexes) {
    
    if (obj.constructor.name !== 'Object') {
        return null;
    }
    
    this.paths = {};
    this.add(obj);
    
    // prepare indexes
    if (indexes && indexes.constructor.name === "Array") {
        this.indexes = prepareIndexes(indexes);
    }
};

// add paths to schema
Schema.prototype.add = function (obj, prefix) {
    
    prefix = prefix || '';
    
    for (var key in obj) {
        
        if (obj[key] === null) {
            throw new TypeError('Invalid value for schema path `' + prefix + key + '`');
        }
        
        // get type and definition
        var type = obj[key].constructor.name;
        var object = obj[key];
        
        // handle array structures
        if (type === 'Array') {
            type = obj[key][0].constructor.name;
            object = obj[key][0];
        }
        
        // check if obj[key] is an object and not a type with options
        if (type === 'Object' && typeof object.type === "undefined") {
            
            // handle nested objects
            if (Object.keys(object).length) {
                
                //this.nested[prefix + key] = true;
                this.add(object, prefix + key + '.');
                
            } else {
                path.call(this, prefix + key, object);
            }
        
        // handle nested schemas
        } else if (type === 'Schema' && object.paths) {
            this.add(object.paths, prefix + key + '.');
        
        // create path
        } else {
            path.call(this, prefix + key, object);
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

function prepareIndexes (indexes) {
    
    var _indexes = [];
    
    for (var i in indexes) {
        
        // handle fields
        if (!indexes[i].fields) {
            continue;
        }
        
        var name;
        if (indexes[i].fields.constructor.name === 'Array') {
            name = indexes[i].fields.join('');
        } else {
            name = indexes[i].fields.toString();
        }
        
        // handle options
        if (typeof indexes[i].options === 'object') {
            
            var sorted = [];
            
            for (var option in indexes[i].options) {
                
                if (!indexes[i].options && option !== 'w' && option !== 'v') {
                    continue;
                }
                
                sorted.push(option);
            }
            
            sorted.sort();
            
            for (var ii in sorted) {
                
                if (indexes[i].options[sorted[ii]]) {
                    
                    // convert boolean to number
                    if (typeof indexes[i].options[sorted[ii]] === 'boolean') {
                        indexes[i].options[sorted[ii]] = 1;
                    }
                    
                    name += sorted[ii] + indexes[i].options[sorted[ii]];
                }
            }
        } else {
            indexes[i].options = {};
        }
        
        indexes[i].options.name = name;
        
        _indexes.push([indexes[i].fields, indexes[i].options]);
    }
    
    return _indexes;
}

module.exports = Schema;
