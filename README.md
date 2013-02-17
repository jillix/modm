MODM
=======

Mongodb Object Document Mapper

####Basic example
    var modm = require('modm');

    // define a schema
    schema = modm.schema({field: String});
    
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
