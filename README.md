MODM
=======

Mongodb Object Document Mapper

####Example
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
    
    // get a collection
    myCollection = model('myCollection', schema);
    
    // db operations
    myCollection.insert({data: 1}, function (err, item) {
       //... 
    });
    
    // connect first, otherwise find will return undefined
    // instead of a cursor.
    model.connect(function (err, db) {
        var cursor = myCollection.find({/*query*/});
        cursor.toArray(function () {
            //...
        });
    });
    
    // ..or access the cursor in the callback
    myCollection.find({/*query*/}, function (err, cursor) {
        cursor.toArray(function () {
            //...
        });
    });
    

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
    
    // not yet implemented..
    live: true // false
