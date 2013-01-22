var interFace = require('./apis/mongodb');

function ensureIndexes () {
    
    var self = this;
    
    // get index informations
    this.indexInformation(function (err, indexInfo) {
        
        for (var i in self.schema.indexes) {
            
            // create the index, if it not exists
            if (!indexInfo[self.schema.indexes[i][1].name]) {
                
                // create indexes
                self.createIndex(self.schema.indexes[i][0], self.schema.indexes[i][1], function (err, result) {
                    
                    // TODO fire events
                    //console.log(result);
                });
            }
        }
    });
}

function Model (colName, schema, db) {
    
    this.db = db;
    this.schema = schema;
    this.colName = colName.toLowerCase();
    this.collection = db.collection(colName);
    
    // TODO make sure that the collection exists
    db.createCollection(this.colName, function (err) {
        // TODO fire events
    });
    
    if (db.autoIndex && this.schema.indexes) {
        ensureIndexes.call(this);
    }
}

Model.prototype = interFace;

exports.Model = Model;
