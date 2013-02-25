var Pongo = require('pongo');
var Schema = require('./lib/schema');
var Model = require('./lib/model');

function modm (dbName, options) {
    
    var callbacks = [];
    
    var db = {
        name: dbName,
        options: options,
        driver: new Pongo(options),
        connection: null,
        connect: function (callback) {
            
            // db is connected
            if (this.connection) {
                return callback(null, this.connection);
            }
            
            var self = this;
            this.driver.connect(this.name, function (err, db) {
                
                // TODO emit event
                self.connection = err ? null : db;
                callback(err, db);
            });
        }
    };
    
    return function (collection, schema) {
        return Model(db, collection, schema);
    };
}

modm.Schema = Schema;

module.exports = modm;
