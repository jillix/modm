var Document = require('./document');
/*module.exports = function (db) {
    
    return function (collectionName, schema) {
        
        var model = new Model(collectionName, schema);
        model.db = db;
        model.collection = db.collection(collectionName);
        
        return model;
    }
};*/

function Model (collectionName, schema) {
    
    this.schema = schema;
    
    return Document.call(this);
}

Model.prototype.find = function (query, options, callback) {
    console.log(this.schema);
};

Model.prototype.findOne = function (query, options, callback) {
    
};

module.exports = Model;
