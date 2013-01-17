var interFace = require('./apis/mongodb');


function ensureIndex () {

    // check if index exists
    // create index
    
    // check if index changed
    // update index
    
    // create indexes
    console.log(this.schema.indexes);
    console.log('===============');
    
    this.indexes(function (err, indexInfo) {
        
        for (var i in indexInfo) {
            
            var indexObj = [Object.keys(indexInfo[i].key), {}];
            
            for (var key in indexInfo[i]) {
                
                if (key !== "v" && key !== "key" && key !== "ns" && key !== "name") {
                    indexObj[1][key] = indexInfo[i][key];
                }
            }
            
            console.log(JSON.stringify(indexObj));
            
            
            for (var I in this.schema.indexes) {
                
                var indexSchema = JSON.stringify(this.schema.indexes[I]);
                var indexInfo = JSON.stringigy(indexObj);
            }
        }
    });
    
    for (var i = 0, l = this.schema.indexes.length; i < l; ++i) {
        
        //console.log(this.schema.indexes[i]);
        this.ensureIndex(this.schema.indexes[i][0], this.schema.indexes[i][1], function () {
            
            //console.log(arguments);
        });
    }
}

function Model (colName, schema, db) {
    
    this.schema = schema;
    this.colName = colName;
    this.db = db;
    this.collection = this.db.collection(colName);
    
    // make sure that the collection exists
    db.createCollection(colName, function (err) {
        
        //console.log(err);
    });
    
    if (this.schema.indexes) {
        ensureIndex.call(this);
    }
    
}

Model.prototype = interFace;

exports.Model = Model;
