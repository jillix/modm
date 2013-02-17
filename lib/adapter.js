var modify = require('./manipulator').modify;

// INFO: when an item is pushed or pulled in or from an array, the array length is not validated.
// INFO: results of atomic operations are not validated.
function validateDocument (document, path, type, callback) {
    
    if (document.constructor.name === 'Object' && type !== 'object') {
        
        return handleValidation.call(this, document, path, callback);
        
    } else if (type) {
        
        var options = this._schema.paths[path];
        
        if (options.validate) {
            
            // modify document
            document = modify(options, document);
            
            // if value is valid, apply filters and modificators
            if (options.validate(document)) {
                
                return;
            
            } else {
                return 'Validation failed\nPATH: ' + path + ' | TYPE: ' + type + ' | VALUE: ' + document;
            }
        } else {
            return 'No validation function found\nPATH: ' + path;
        }
    } else {
        return 'Path not in schema\nPATH: ' + path;
    }
}

function handleValidation (document, prefix, callback) {
    
    var err;
    
    for (var field in document) {
        
        // get field without operators
        var _field = field[0] === '$' ? '' : field.replace(/\.\$|\.*[0-9\[\]]+/, '');
        
        // get current path with prefix
        var path = prefix ? prefix + (_field ? '.' + _field : '') : _field;
        
        // get schema type
        var type = this._schema.paths[path] ? this._schema.paths[path].type : null;
        
        if (document[field].constructor.name === 'Array' && type !== 'array') {
            
            for (var i in document[field]) {
                
                err = validateDocument.call(this, document[field][i], path, type, callback);
                
                if (err) {
                    return err;
                }
            }
        } else {
            
            err = validateDocument.call(this, document[field], path, type, callback);
            
            if (err) {
                return err;
            }
        }
    }
}

function adapter (method, args, docIndex) {
    
    var self = this;
    
    this.db.connect(function (err, db) {
        
        // create collection instance
        if (typeof self.collection === 'string') {
            self.collection = db.collection(self.collection);
        }
        
        if (!self.collection[method]) {
            return;
        }
        
        args = Array.prototype.slice.call(args);
        
        // get callback ref
        var callback = args[args.length-1];
        var document = args[docIndex];
        
        // validate the document
        if (document) {
            
            var err = handleValidation.call(self, document, '', callback);
            
            if (err) {
                return callback(err);
            }
        }
        
        self.collection[method].apply(self.collection, args);
    });
}

module.exports = adapter;
