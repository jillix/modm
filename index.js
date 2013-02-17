var Pongo = require('pongo');
var Schema = require('./lib/schema');
var Model = require('./lib/model');

function execCallbacks (callbacks, err, db) {
    for (var i = 0, l = callbacks.length; i < l; ++i) {
        callbacks[i](err, db);
    }
}

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
            
            callbacks.push(callback);
            
            // no connection established
            if (this.connection === null) {
                this.connection = false;
                
                var self = this;
                this.driver.connect(this.name, function (err, db) {
                    
                    self.connection = err ? null : db;
                    execCallbacks(callbacks, err, db);
                    return callbacks = [];
                });
            }
        }
    };
    
    return function (collection, schema) {
        return Model(db, collection, schema);
    };
}

modm.Schema = Schema;

module.exports = modm;
