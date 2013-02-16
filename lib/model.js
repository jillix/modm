var interFace = require('./apis/mongodb');

function clone (obj) {
    function Model () {}
    Model.prototype = obj;
    return new Model();
}

function ensureIndexes () {
    
    var self = this;
    
    // get index informations
    this.indexInformation(function (err, indexInfo) {
        
        if (!err) {
            
            for (var i in self._schema.indexes) {
                
                // create the index, if it not exists
                if (!indexInfo[self._schema.indexes[i][1].name]) {
                    
                    // create indexes
                    self.createIndex(self._schema.indexes[i][0], self._schema.indexes[i][1], function (err, result) {
                        
                        // TODO fire events
                        //console.log(result);
                    });
                }
            }
        }
    });
}

function Model (db, collectionName, schema) {
    
    var model = clone(interFace);
    model.db = db;
    model.collection = collectionName;
    model._schema = schema;
    
    // create collection and indexes in the background
    model.db.connect(function (err, db) {
        
        if (err) {
            // ??? error events?
        }
        
        // TODO make sure that the collection exists
        db.createCollection(model.collection, function (err, collection) {
            
            if (err) {
                // ??? error events?
            }
            
            model.collection = collection;
            // TODO fire events
        });
        
        if (model.db.options.autoIndex && model._schema.indexes) {
            ensureIndexes.call(model);
        }
    });
    
    return model;
}

module.exports = Model;
