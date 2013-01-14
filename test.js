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
    
    server: {poolSize: 3},
    db: {w: 1}
});

Congo.connect('cmr2', function (err, newModel) {
    
    if (err) {
        throw new Error(err);
    }
    
    //var myModel = newModel('users', mySchema);
    
    //var myModel = model('users', mySchema);
    //myModel.find({name: 'name'});
    
    /*
    var myModel = db.model('trucken', mySchema);
    myModel.findOne({}, function () {});
    */
    
    //var myDocument = myModel({lastname: "salat", firstname: "fish"});
    //myDocument.save(function (err) {});
    
});
