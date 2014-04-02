var adapter = require('../adapter');

// MongoDB Collection Methods
module.exports = {

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#insert
    // insert(docs[, options][, callback])
    insert:function(){return adapter.call(this,"insert",arguments,0)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#remove
    // remove([selector][, options], [callback])
    remove:function(){return adapter.call(this,"remove",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#rename
    // rename(newName, callback)
    rename:function(){return adapter.call(this,"rename",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#save
    // save([doc][, options], [callback])
    save:function(){return adapter.call(this,"save",arguments,0)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#update
    // update(selector, document[, options][, callback])
    update:function(){return adapter.call(this,"update",arguments,1)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#distinct
    // distinct(key[, query][, options], callback)
    distinct:function(){return adapter.call(this,"distinct",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#count
    // count([query][, options], callback)
    count:function(){return adapter.call(this,"count",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#drop
    // drop(callback)
    drop:function(){return adapter.call(this,"drop",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#findandmodify
    // findAndModify(query, sort, doc[, options], callback)
    findAndModify:function(){return adapter.call(this,"findAndModify",arguments,2)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#findandremove
    // findAndRemove(query, sort[, options], callback)
    findAndRemove:function(){return adapter.call(this,"findAndRemove",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#find
    // find(query[, options], callback)
    find:function(){return adapter.call(this,"find",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#findone
    // findOne(query[, options], callback)
    findOne:function(){return adapter.call(this,"findOne",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#createindex
    // createIndex(fieldOrSpec[, options], callback)
    createIndex:function(){return adapter.call(this,"createIndex",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#ensureindex
    // ensureIndex(fieldOrSpec[, options], callback)
    ensureIndex:function(){return adapter.call(this,"ensureIndex",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#indexinformation
    // indexInformation([options], callback)
    indexInformation:function(){return adapter.call(this,"indexInformation",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#dropindex
    // dropIndex(name, callback)
    dropIndex:function(){return adapter.call(this,"dropIndex",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#dropallindexes
    // dropAllIndexes(callback)
    dropAllIndexes:function(){return adapter.call(this,"dropAllIndexes",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#reindex
    // reIndex(callback)
    reIndex:function(){return adapter.call(this,"reIndex",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#mapreduce
    // mapReduce(map, reduce[, options], callback)
    mapReduce:function(){return adapter.call(this,"mapReduce",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#group
    // group(keys, condition, initial, reduce, finalize, command[, options], callback)
    group:function(){return adapter.call(this,"group",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#options
    // options(callback)
    options:function(){return adapter.call(this,"options",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#iscapped
    // isCapped(callback)
    isCapped:function(){return adapter.call(this,"isCapped",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#indexexists
    // indexExists(indexNames, callback)
    indexExists:function(){return adapter.call(this,"indexExists",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#geonear
    // geoNear(x, y[, options], callback)
    geoNear:function(){return adapter.call(this,"geoNear",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#geohaystacksearch
    // geoHaystackSearch(x, y[, options], callback)
    geoHaystackSearch:function(){return adapter.call(this,"geoHaystackSearch",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#indexes
    // indexes(callback)
    indexes:function(){return adapter.call(this,"indexes",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#aggregate
    // aggregate(array[, options], callback)
    aggregate:function(){return adapter.call(this,"aggregate",arguments)},

    // http://mongodb.github.com/node-mongodb-native/api-generated/collection.html#stats
    // stats([options], callback)
    stats:function(){return adapter.call(this,"stats",arguments)}
};
