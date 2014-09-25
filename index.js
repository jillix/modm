var Mongo = require("mongodb");
var MongoClient = Mongo.MongoClient;
var Server = Mongo.Server;
var Schema = require("./lib/schema");
var Model = require("./lib/model");

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 27017;
const DEFAULT_BUFFERSIZE = 100;

var _serverCache = {};

function callbacks(err, db) {
    var self = this;
    var buffer = self.buffer;
    var args = arguments;
    buffer.forEach(function (cBuff) {
        cBuff.apply(self, arguments);
    });
}

function bufferCallback(callback) {

    var self = this;
    var buffer = self.buffer;

    if (buffer.length < self.MAX_CALLBACKS_IN_BUFFER) {
        buffer.push(callback);
    } else {
        callback(new Error("Number of callbacks in buffer exceeded."));
    }
}

function modm(dbName, options) {

    var db = function (collection, schema) {
        return Model(db, collection, schema);
    };

    db.options = options;
    db.MAX_CALLBACKS_IN_BUFFER = options.bufferSize || DEFAULT_BUFFERSIZE;
    db.buffer = [];
    db._dbName = dbName;

    debugger;
    var host = options.host || DEFAULT_HOST;
    var port = options.port || DEFAULT_PORT;
    var serverPath = [host, port].join(":");
    var server = Object(_serverCache[serverPath]).server || (
        _serverCache[serverPath] = {
            server: new Server(host, port)
        }
    ).server;

    db.driver = new MongoClient(server, options);

    db.connection = null;
    db.connect = function (callback) {

        var self = this;
        debugger;

        // db is connected
        if (self.connection) {
            return callback(null, self.connection);
        }

        if (self._connecting) {
            return bufferCallback.call(self, callback);
        }

        bufferCallback.call(self, callback);

        if (_serverCache[serverPath].client) {
            debugger
            return callbacks.call(self, null, self.connection = _serverCache[serverPath].client.db(dbName));
        }

        self._connecting = true;

        self.driver.open(function(err, client) {
            if (err) {
                self.connection = null;
                return callbacks.call(self, err);
            }

            debugger;
            self._connecting = false;
            _serverCache[serverPath].client = client;
            callbacks.call(self, null, self.connection = client.db(dbName));
        });
    };

    return db;
}

modm.Schema = Schema;
modm.ObjectId = Mongo.ObjectID;
module.exports = modm;
