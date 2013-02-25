var valify = require('./manipulator');

function validateValue (value, path, type) {
    
    if (value.constructor.name === 'Object' && type !== 'object') {
        
        return handleValidation.call(this, value, path);
        
    } else if (type) {
        return valify(this._schema.paths[path], value);
        
    } else {
        return ['Path not in schema\nPATH: ' + path];
    }
}

function handleValidation (document, prefix) {
    
    var result;
    
    for (var field in document) {
        
        // get field without operators
        var _field = field[0] === '$' ? '' : field.replace(/\.\$|\.*[0-9\[\]]+/, '');
        
        // get current path with prefix
        var path = prefix ? prefix + (_field ? '.' + _field : '') : _field;
        
        // get schema type
        var type = this._schema.paths[path] ? this._schema.paths[path].type : null;
        
        if (document[field].constructor.name === 'Array' && type !== 'array') {
            
            for (var i in document[field]) {
                
                result = validateValue.call(this, document[field][i], path, type);
                
                if (result[0]) {
                    return result;
                }
                
                document[field][i] = result[1];
            }
        } else {
            
            result = validateValue.call(this, document[field], path, type);
            
            if (result[0]) {
                return result;
            }
            
            document[field] = result[1];
        }
    }
    
    return [null, document];
}

function adapter (method, args, docIndex) {
    
    var self = this;
    var args = Array.prototype.slice.call(args);
    
    // connect to db
    if (!self.db.connection) {
        
        var caller = adapter.caller;
        return self.db.connect(function (err, db) {
            
            caller.apply(self, args);
        });
    }
    
    /////////////////////////////////////////////////////////////////////
    
    // get callback ref
    var callback = args[args.length-1];
    
    // create collection instance
    if (typeof this.collection === 'string') {
        self.collection = self.db.connection.collection(self.collection);
    }
    
    if (!self.collection[method]) {
        return;
    }
    
    // validate the document
    if (args[docIndex]) {
        
        // set default value if field doesn't exists
        if (self._schema.default) {
            
            for (var field in self._schema.default) {
                if (typeof args[docIndex][field] === 'undefined') {
                    args[docIndex][field] = self._schema.default[field];
                }
            }
        }
        
        // check if required fields exists
        if (self._schema.required) {
            
            for (var i = 0, l = self._schema.required.length; i < l; ++i) {
                if(typeof args[docIndex][self._schema.required[i]] === 'undefined') {
                    return callback('Missing required field: ' + self._schema.required[i]);
                }
            }
        }
        
        var result = handleValidation.call(self, args[docIndex], '');
        
        if (result[0]) {
            return callback(result[0]);
        }
        
        args[docIndex] = result[1];
    }
    
    return self.collection[method].apply(self.collection, args);
}

module.exports = adapter;
