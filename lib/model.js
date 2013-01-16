var mongodb = require('./apis/mongodb');

function Model (colName, schema) {
    
    this.schema = schema;
    this.colName = colName;
    
    // TODO create indexes
}

Model.prototype = mongodb;

exports.Model = Model;
