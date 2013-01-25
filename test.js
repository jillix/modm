var Congo = require('./lib/index');
var util = require('util');

var options = {
    server: {poolSize: 1},
    db: {w: 1},
    autoIndex: true
};

var nested =  new Congo.Schema({
    nested: String,
    schema: String
});

// TODO nested objects/schemas
/*var user = {
    _items: [Array],
    region: String,
    branch: String,
    visRegion: String,
    customerNr: {type: String, required: true, meta: true},
    email: {type: String, validate: "email", default: "default@email.com"},
    phone: Number,
    company: String,
    lastName: String,
    firstName: String,
    addition: String,
    department: String,
    adress: {type: String, validate: function (data) {
        console.log('validation function adress: ' + data);
        return true;
    }},
    pob: String,
    zip: Number,
    city: String,
    bizField: String,
    sow: String,
    distributor: String
};*/
    
var user = {
    array: Array,
    string: String,
    number: Number,
    object: Object,
    date: Date,
    nestedSchema: {trucken: nested},
    schema: nested,
    
    arrayObject: [{a: 1, b:2}],
    arraySchema: [nested],
    
    crazy: [{
        object: Object,
        schema: nested
    }]
};

var userIndexes = [
    {
        fields: ['_items'],
        options: {sparse: true}
    },
    {
        fields: ['customerNr'],
        options: {unique: true}
    }
];

var userSchema = new Congo.Schema(user, userIndexes);

Congo.setOptions(options);
Congo.connect('crm2', function (err, db) {
    
    if (err) {
        throw new Error(err);
    }
    
    var query = {};
    var options = {};
    var callback = function (err) {};
    
    var document = {
        //$set: {
            array: ['ItemA', 'ItemB'],
            string: 'string swing',
            number: 1,
            object: {attr1: 'A', attr2: 'B'},
            date: new Date(),
            nestedSchema: {
                trucken: {
                    nested: 'trucken doch'
                }
            },
            crazy: [{
                schema: {
                    schema: 'schema'
                }
            }]
            //'objectArray.[7].collection': 'trucken1',
            //'objectArray.$.collection': 'trucken2'
        //}
        //$push: {_items: 'value'},
    };
    
    /*var document = {
        //$set: {lname: 'value'},
        $set: {
            name: {
                $whatever: {
                    first: 'doch',
                    last: 'trucken'
                }
            },
            
            andere: 'ahh.. andere'
        },
        
        $trucken: "doch",
        
        $rename: {field1: 'value'},
        $addToSet: {field4: 'value'},
        $pop: {field5: 'value'},
        $pullAll: {field6: ['value']},
        $pull: {field7: 'value'},
        $pushAll: {field8: ['value']},
        $push: {field9: 'value'},
        
        // ignore this operators
        $unset: {field3: 'value'},
        $inc: {field2: 'value'},
        $bit: { field10: { and: 5 } }
    };*/
    
    var myModel = db.model('users', userSchema);
    
    myModel.insert(document, function (err) {
        
        console.log('INSERT: ' + (err ? err : 'ok'));
        
        myModel.remove({}, function (err) {
            
            console.log('REMOVE: ' + (err ? err.err : 'ok'));
            db.close();
        });
    });
    
    /*myModel.remove(query);
    myModel.rename();
    myModel.save(query, document);
    myModel.update(query, document, options);
    myModel.distinct();
    myModel.count(query);
    myModel.drop();
    myModel.findAndModify(query, document);
    myModel.findAndRemove(query);
    myModel.find(query);
    myModel.findOne(query);
    myModel.createIndex();
    myModel.ensureIndex();
    myModel.indexInformation();
    myModel.dropIndex();
    myModel.dropAllIndexes();
    myModel.reIndex();
    myModel.mapReduce();
    myModel.group();
    myModel.options();
    myModel.isCapped();
    myModel.indexExists();
    myModel.geoNear();
    myModel.geoHaystackSearch();
    myModel.indexes();
    myModel.aggregate();
    myModel.stats();
    */
});
