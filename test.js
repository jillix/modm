var Congo = require('./lib/index');
var util = require('util');

var mySchema = new Congo.Schema({
    _items: {type: Array, index: {sparse: true}},
    region: String,
    branch: String,
    visRegion: String,
    customerNr: {type: String, required: true, index: {unique: true}},
    email: {type: String, validate: "email", default: "default@email.com"},
    phone: Number,
    company: String,
    lastName: String,
    firstName: String,
    addition: String,
    department: String,
    adress: {type: String, validate: function () {return true;}},
    pob: String,
    zip: Number,
    city: String,
    bizField: String,
    sow: String,
    distributor: String
});

Congo.setOptions({
    
    server: {poolSize: 1},
    db: {w: 1}
});

Congo.connect('crm2', function (err, db) {
    
    if (err) {
        throw new Error(err);
    }
    
    var query = {};
    var options = {};
    var document = {
        name: 'trucken',
        age: 27
    };
    var callback = function (err) {
        
    };
    
    var myModel = db.model('users', mySchema);
    
    /*myModel.insert(document, function () {
        
        console.log(arguments);
    });
    
    myModel.remove(query);
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
    myModel.stats();*/
});
