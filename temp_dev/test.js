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

var ary = {a: String, b: Number};

var user = {
    array: Array,
    string: {type: String, validate: function () {return true;}},
    number: Number,
    object: Object,
    date: Date,
    nestedSchema: {trucken: nested},
    schema: nested,
    arrayObject: [{a: Number, b:Number}],
    arraySchema: [nested],
    crazy: [{
        object: Object,
        schema: nested
    }],
    arrayNested: [ary],
    test: [String],
    objectArray: [Object]
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
    };
    */
    
    var query = {};
    var options = {};
    var callback = function (err) {};
    
    var document = {
        array: ['ItemA', 'ItemB', 2],
        test: 'testschten doch',
        crazy: [
            {schema: {schema: 'schema'}},
            {object: {some: 'data'}}
        ],
        objectArray: {ttest: 1},
        arrayObject: [{a: 1, b: 2}]
    };
    
    var myModel = db.model('users', userSchema);
    
    myModel.insert(document, function (err) {
        
        if (err) {
            console.log(err);
            return db.close();
        }
        
        myModel.remove({}, function (err) {
            
            if (err) {
                console.log(err);
            }
            
            db.close();
        });
    });
});
