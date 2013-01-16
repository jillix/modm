var interFace = require('./apis/mongodb');

function Model (colName, schema, db) {
    
    this.schema = schema;
    this.colName = colName;
    this.db = db;
    this.collection = this.db.collection(colName);
    
    // make sure that the collection exists
    // create indexes
    if (this.schema.indexes) {
        
        for (var i = 0, l = this.schema.indexes.length; i < l; ++i) {
            
            console.log(this.schema.indexes[i]);
            //this.collection.ensureIndex();
        }
    }
    
    console.log(this.schema.indexes);
}

Model.prototype = interFace;

exports.Model = Model;
