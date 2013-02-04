var prepare = require('./options').prepare;

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

// prepare schema path options
function path (path, options) {
    
    var _typ = typeof options.type === 'undefined' ? options : options.type;
    var type = (_typ.name || _typ.constructor.name).toLowerCase();
    
    // prepare options
    this.paths[path] = prepare(type, options);
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
