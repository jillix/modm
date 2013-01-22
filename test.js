var Congo = require('./lib/index');
var util = require('util');

var options = {
    server: {poolSize: 1},
    db: {w: 1},
    autoIndex: true
};

var user = {
    _items: Array,
    region: String,
    branch: String,
    visRegion: String,
    customerNr: {type: String, required: true},
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
        customerNr: 'trucken_doch',
        adress: 'truckenstrasse 55'
    };
    
    var myModel = db.model('users', userSchema);
    
    myModel.insert(document, function (err) {
        
        console.log('INSERT: ' + (err ? err.err : 'ok'));
        
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
