MODM
=======

Mongodb Object Document Mapper

####Basic example
    var modm = require('modm');

    // define a schema
    schema = new modm.Schema({field: String});
    
    // create db connection
    model = modm('myDb', {
        host: '127.0.0.1',
        port: 27017,
        server: {pooSize: 5},
        db: {w: 1}
    });
    
    // get collection
    myCollection = model('myCollection', schema);
    
    // db operations
    myCollection.insert({data: 1}, function (err, item) {
       //... 
    });
    
####Example with connect
    var modm = require('modm');

    // define a schema
    schema = new modm.Schema({field: String});
    
    // create db connection
    model = modm('myDb', {
        server: {pooSize: 2},
        db: {w: 1}
    });
    
    // get collection
    myCollection = model('myCollection', schema);
    
    // connect first, otherwise find will return undefined
    model.connect(function (err, db) {
        var cursor = myCollection.find();
        cursor.toArray(function () {
            //...
        })
    })

####Info
Results of atomic operations are not validated.

####Schema options
    type: String, // Array | Boolean | Buffer | Date | Number | Object | ObjectID
    required: true, // false
    default: 'default' // default value
    validate: function () {}, // email, url, ...
    manipulate: function () {},
    pre: 'pre', // "string"
    post: 'post', // "string"
    charStyle: 'normal', // uppercase | lowercase
    trim: true, // false
    maxLength: 5, // integer
    minLength: 1, // integer
    max: 5, // number
    min: -3, // number
    
    //coming soon...
    live: true // false
