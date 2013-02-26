var Events = require('events').EventEmitter;
var interFace = require('./apis/mongodb');

function extend (object, inherit) {
    
    var Model = function(properties) {
        
        for (var property in properties) {
            
            if (properties.hasOwnProperty(property)) {
                this[property] = properties[property];
            }
        }
    };
    
    Model.prototype = inherit || {};
    object = new Model(object);
    
    return object;
};

function ensureIndexes () {
    
    var self = this;
    
    // get index informations
    this.indexInformation(function (err, indexInfo) {
        
        if (err) {
            return self.emit('modmError', err);
        }
        
        for (var i in self._schema.indexes) {
            
            // create the index, if it not exists
            if (!indexInfo[self._schema.indexes[i][1].name]) {
                
                // create indexes
                self.createIndex(self._schema.indexes[i][0], self._schema.indexes[i][1], function (err, result) {
                    
                    if (err) {
                        return self.emit('modmError', err);
                    }
                    
                    self.emit('modmIndexCreated', result);
                });
            }
        }
    });
}

function Model (db, collectionName, schema) {
    
    var model = extend(interFace, new Events());
    model.db = db;
    model.collection = collectionName;
    model._schema = schema;
    
    // create indexes in the background
    if (model.db.options.autoIndex && model._schema.indexes) {
        ensureIndexes.call(model);
    }
    
    return model;
}

module.exports = Model;
