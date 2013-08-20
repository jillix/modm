var valify = require('./manipulator');
var defaultValue = require('./default');

function validateValue (value, path, type, paths) {

    if (value.constructor.name === 'Object' && type !== 'object') {
        return handleValidation.call(this, value, path, paths);
    } else if (type) {
        return valify(this._schema.paths[path], value);
    } else {
        return ['Path not in schema PATH: ' + path];
    }
}

function handleValidation (document, prefix, paths) {
    
    var result;
    
    for (var field in document) {
        
        // get field without operators
        var _field = field[0] === '$' ? '' : field.replace(/\.\$|\[[0-9]+\]/, '');

        // get current path with prefix
        var path = prefix ? prefix + (_field ? '.' + _field : '') : _field;

        // get schema type
        var type = this._schema.paths[path] ? this._schema.paths[path].type : null;

        if (path !== '' && type) {
            paths[path] = type;
        }

        if (document[field].constructor.name === 'Array' && type !== 'array') {
            
            for (var i in document[field]) {
                
                result = validateValue.call(this, document[field][i], path, type, paths);
                
                if (result[0]) {
                    return result;
                }
                
                document[field][i] = result[1];
            }
        } else {
            
            result = validateValue.call(this, document[field], path, type, paths);
            
            if (result[0]) {
                return result;
            }
            
            document[field] = result[1];
        }
    }
    
    return [null, document, paths];
}

function adapter (method, args, docIndex) {
    
    if (!this._schema || !this._schema.paths) {
        return;
    }

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
        
        var result = handleValidation.call(self, args[docIndex], '', {});
        
        if (result[0]) {
            var error = new Error(result[0]);
            // TODO appropriate status codes
            error.statusCode = 400;
            return callback(error);
        }

        // set default value if field doesn't exists
        if (self._schema.default) {
            for (var field in self._schema.default) {
                if (typeof result[2][field] === 'undefined' && self._schema.paths[field]) {
                    if (method !== 'insert') {
                        result[1].$set[field] = defaultValue(self._schema.paths[field].type, self._schema.default[field]);
                    } else {
                        result[1][field] = defaultValue(self._schema.paths[field].type, self._schema.default[field]);
                    }
                }
            }
        }
        
        // check if required fields exists
        // TODO it could be, that not all required fields are in the document on an upsert.
        if (self._schema.required && method === 'insert' || (method === 'update' && (args[2] && args[2].upsert || !args[docIndex].$set))) {
            for (var i = 0, l = self._schema.required.length; i < l; ++i) {
                if(self._schema.required[i] !== '_id' && typeof result[2][self._schema.required[i]] === 'undefined') {
                    return callback(new Error('Missing required field: ' + self._schema.required[i]));
                }
            }
        }

        args[docIndex] = result[1];
    }
    
    return self.collection[method].apply(self.collection, args);
}

module.exports = adapter;

