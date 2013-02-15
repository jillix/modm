var Pongo = require('pongo');
var Schema = require('./lib/schema');
var Model = require('./lib/model').Model;
var options;
var pongo;

exports.Schema = Schema;

exports.setOptions = function (opts) {
    
    if (options) {
        throw new Error('DB Options already set.');
    }
    
    options = opts;
};

function createModel (colName, schema) {
    
    var model = new Model(colName, schema, this);
    
    return model;
}

exports.connect = function (dbName, callback) {
    
    if (!pongo) {
        pongo = new Pongo(options);
    }
    
    pongo.connect(dbName, function (err, db) {
        
        if (err) {
            return callback(err);
        }
        
        db.autoIndex = options.autoIndex || false;
        db.model = createModel;
        
        callback(null, db);
    });
};
