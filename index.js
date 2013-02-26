var Pongo = require('pongo');
var Schema = require('./lib/schema');
var Model = require('./lib/model');

function modm (dbName, options) {
    
    var db = function (collection, schema) {
        return Model(db, collection, schema);
    };
    
    db.options = options;
    db.driver = new Pongo(options);
    db.connection = null;
    db.connect = function (callback) {
        
        // db is connected
        if (this.connection) {
            return callback(null, this.connection);
        }
        
        var self = this;
        this.driver.connect(dbName, function (err, db) {
            
            self.connection = err ? null : db;
            callback(err, db);
        });
    };
    
    return db;
}

modm.Schema = Schema;

module.exports = modm;
