// Dependencies
var Mongo = require("mongodb");
var MongoClient = Mongo.MongoClient;
var Server = Mongo.Server;
var Schema = require("./lib/schema");
var Model = require("./lib/model");

// Constants
const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 27017;
const DEFAULT_BUFFERSIZE = 100;

// Client cache
var _clientCache = {};

/**
 * callbacks
 * Fires all buffered callbacks
 *
 * @name callbacks
 * @function
 * @param {Error} err Error that is sent to all callbacks
 * @param {Object} db Database instance
 * @return {undefined}
 */
function callbacks(err, db) {
    var self = this;
    var buffer = self.buffer;
    var args = arguments;
    buffer.forEach(function(cBuff) {
        cBuff.apply(self, args);
    });
    self.buffer = [];
}

/**
 * bufferCallback
 * Buffers a callback during connecting
 *
 * @name bufferCallback
 * @function
 * @param {Function} callback The callback that should be buffered
 * @return {undefined}
 */
function bufferCallback(callback) {

    var self = this;
    var buffer = self.buffer;

    if (buffer.length < self.MAX_CALLBACKS_IN_BUFFER) {
        buffer.push(callback);
    } else {
        callback(new Error("Number of callbacks in buffer exceeded."));
    }
}

/**
 * modm
 * Creates a new instance of modm
 *
 * @name modm
 * @function
 * @param {String} dbName Database name
 * @param {Object} options An object containing the following fields:
 *  - buffersize (default: 100)
 *  - port (default: 27017)
 *  - host (default: "127.0.0.1")
 *  - server: the object passed when creating a server instance (default: {native_parser: true, poolSize: 1})
 *  - db: the object passed when creating a Mongo Client instance (default: {w: 1})
 * @return {Function} Model function
 */
function modm(dbName, options) {

    var db = function(collection, schema) {
        return Model(db, collection, schema);
    };

    db.options = options;
    db.MAX_CALLBACKS_IN_BUFFER = options.bufferSize || DEFAULT_BUFFERSIZE;
    db.buffer = [];
    db._dbName = dbName;

    var host = options.host || DEFAULT_HOST;
    var port = options.port || DEFAULT_PORT;
    var serverPath = [host, port].join(":");

    options.server = options.server || {
        native_parser: true,
        poolSize: 1
    };

    options.db = options.db || {
        w: 1
    };

    var server = new Server(host, port, options.server);
    db.driver = new MongoClient(server, options.db);
    db.connection = null;

    /**
     * connect
     * Connects to database
     *
     * @name connect
     * @function
     * @param {Function} callback The callback function
     * @return {undefined}
     */
    db.connect = function(callback) {

        var self = this;

        // db is connected
        if (self.connection) {
            return callback(null, self.connection);
        }

        if (self._connecting) {
            return bufferCallback.call(self, callback);
        }

        if (_clientCache[serverPath]) {
            return callback.call(self, null, self.connection = _clientCache[serverPath].db(dbName));
        }

        self._connecting = true;
        bufferCallback.call(self, callback);

        self.driver.open(function(err, client) {
            if (err) {
                self.connection = null;
                return callbacks.call(self, err);
            }

            self._connecting = false;
            _clientCache[serverPath] = client;
            callbacks.call(self, null, self.connection = client.db(dbName));
        });
    };

    return db;
}

modm.Schema = Schema;
modm.ObjectId = Mongo.ObjectID;
module.exports = modm;
