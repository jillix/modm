// INFO: when an item is pushed or pulled in or from an array, the array length is not validated.
// INFO: results of atomic operations are not validated.
function validateDocument (document, path, type, callback) {
    
    if (document.constructor.name === 'Object' && type !== 'object') {
        
        handleValidation.call(this, document, path, callback);
        
    } else if (type) {
        
        if (this.schema.paths[path].validate) {
            
            // validate value
            if (this.schema.paths[path].validate(document)) {
                
                return;
                
            } else {
                return 'Validation failed.';
            }
        } else {
            return 'No validation function found.';
        }
    } else {
        return 'Path not in schema.';
    }
}

function handleValidation (document, prefix, callback) {
    
    for (var field in document) {
        
        // get field without operators
        var _field = field[0] === '$' ? '' : field.replace(/\.\$|\.*[0-9\[\]]+/, '');
        
        // get current path with prefix
        var path = prefix ? prefix + (_field ? '.' + _field : '') : _field;
        
        // get schema type
        var type = this.schema.paths[path] ? this.schema.paths[path].type : null;
        
        if (document[field].constructor.name === 'Array') {
            
            for (var i in document[field]) {
                
                return validateDocument.call(this, document[field][i], path, type, callback);
            }
        } else {
            
            return validateDocument.call(this, document[field], path, type, callback);
        }
    }
    
    return true;
}

function adapter (method, args, docIndex) {
    
    if (!this.collection[method]) {
        return;
    }
    
    args = Array.prototype.slice.call(args);
    
    // get callback ref
    var callback = args[args.length-1];
    var document = args[docIndex];
    
    // validate the document
    if (document) {
        
        var err = handleValidation.call(this, document, '', callback);
        
        if (err) {
            return callback(err);
        }
    }
    
    this.collection[method].apply(this.collection, args);
}

module.exports = adapter;
