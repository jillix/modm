var db = require("./mongo");
var db_name = "crm2";

exports.saveItem = function (type, query, data, callback) {
    
    if (typeof type !== "string" || typeof query !== "object" || typeof data !== "object") {
        
        return callback(new Error("Incomplete prameters."));
    }
    
    db(db_name, type, function(err, collection) {
        
        if (err) {
            return callback(err);
        }
        
        collection.update(query, data, callback);
    });
};

exports.removeItem = function (type, query) {

};

exports.addRelation = function (type, query, relation) {

};

exports.removeRelation = function (type, query, relation) {

};

exports.saveType = function (name, data) {

};

exports.removeType = function (name, cleanUp) {

};
