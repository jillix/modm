/*
TYPES:
    User
    Order
    SAG Customer
    End Consumer
    Business Concept
    Articles
    Campaign
    
    Shop -Happybonus
         -Liqshop
    
    Content
    Website

LIQSHOP
    0: region               [SAG Customer.region]
    1: branch               [SAG Customer.branch]
    2: cnr                  [SAG Customer.customernr]
    3: email                [User.username, SAG Customer.email]
    4: company              [SAG Customer.company]
    5: lname                [SAG Customer.lastname]
    6: fname                [SAG Customer.firstname]
    7: distributorship      [SAG Customer.distributor]

HAPPYBONUS:
    0: region               [SAG Customer.region]
    1: branch               [SAG Customer.branch]
    2: vis_region           [SAG Customer.visitationregion]
    3: cnr                  [SAG Customer.customernr]
    4: email                [User.username, SAG Customer.email]
    5: phone                [SAG Customer.phone]
    6: company              [SAG Customer.company]
    7: lname                [SAG Customer.lastname]
    8: fname                [SAG Customer.firstname]
    9: addition             [SAG Customer.addition]
    10: department          [SAG Customer.department]
    11: street              [SAG Customer.adress]
    12: pob                 [SAG Customer.postofficebox]
    13: zip                 [SAG Customer.zip]
    14: city                [SAG Customer.city]
    15: biz_field           [SAG Customer.businessfield]
    16: sow                 [SAG Customer.sow]

CUSTOMERS
    0: sprache              [End Consumer.lang]
    1: geschlecht           [End Consumer.sex]
    2: vorname              [End Consumer.firstname]
    3: name                 [End Consumer.lastname]
    4: adresse              [End Consumer.adress]
    5: plz                  [End Consumer.zip]
    6: ort                  [End Consumer.city]
    7: email                [User.username, End Consumer.email]
    8: telefon              [End Consumer.phone]
    9: geburtsdatum         [End Consumer.dateofbirth]
    10: marke               [End Consumer.brand]
    11: typ                 [End Consumer.type]
    12: jahrgang            [End Consumer.vintage]
    13: kilometer           [End Consumer.mileage]
*/

var mongoose = require('mongoose');
var CSV = require("a-csv");
var validate = require('./validator');

var liqshop_users = "./data/AbverkKundenExport.txt";
var happybonus_users = "./data/HappyBonusKundenExport.txt";
var end_customers = "./data/endkonsumenten.csv";

var lqCountUser = 0;
var lqErrorUser = 0;
var lqIncompleteUser = 0;
var lqCountSAG = 0;
var lqErrorSAG = 0;
var lqIncompleteSAG = 0;
var closeUsers;
var closeSAG;

// user schema
var _userSchema = {
    _items: {type: Array, index: {sparse: true}, noDefault: true},
    name: {type: String, validate: validate.email, required: true, index: {unique: true}}
};

// sag customer schema
var _sagCustomerSchema = {
    _items: {type: Array, index: {sparse: true}},
    region: String,
    branch: String,
    visRegion: String,
    customerNr: {type: String, required: true, index: {unique: true}},
    email: {type: String, validate: validate.email},
    phone: Number,
    company: String,
    lastName: String,
    firstName: String,
    addition: String,
    department: String,
    adress: String,
    pob: String,
    zip: Number,
    city: String,
    bizField: String,
    sow: String,
    distributor: String
};

// end consumer schema
var _endConsumerSchema = {
    _items: {type: Array, index: {sparse: true}, noDefault: true},
    lang: String,
    sex: String,
    firstName: String,
    lastName: String,
    adress: String,
    zip: Number,
    city: String,
    email: {type: String, required: true, validate: validate.email, index: {unique: true}},
    phone: Number,
    dateOfBirth: Date,
    brand: String,
    type: String,
    vintage: String,
    mileage: String
};

// TODO create an 'upsert' mode
var UserSchema = new mongoose.Schema(_userSchema, {upsert: true});
var SagCustomerSchema = new mongoose.Schema(_sagCustomerSchema, {upsert: true});
var EndConsumerSchema = new mongoose.Schema(_endConsumerSchema, {upsert: true});

// connect to mongodb
function connect(dbName, poolSize, callback) {
    
    // check arguments
    if (arguments.length === 2) {
        callback = poolSize;
    }
    
    var connection = mongoose.createConnection('mongodb://localhost/' + dbName);
    
    connection.on('error', function (err) {
        
        callback(err);
    });
    
    connection.once('open', function () {
        
        callback(null, connection);
    });
    
    return connection;
}

function printStats(name, complete, incomplete, error) {
    
    console.log('Type: ' + name);
    console.log('---------------------------');
    console.log('Complete: ' + complete);
    console.log('Incomplete: ' + incomplete);
    console.log('Errors: ' + error);
    console.log('===========================\n');
}

function parseLqUserData(User, SagCustomer) {
    
    CSV.parse(liqshop_users, {delimiter: ";"}, function (err, row, next) {
        
        // on error
        if (err) {
            return console.log(err);
        }
        
        // on finish
        if (row === null) {
            
            // print stats
            printStats("user (LQ)", lqCountUser, lqIncompleteUser, lqErrorUser);
            printStats("SAG Customer (LQ)", lqCountSAG, lqIncompleteSAG, lqErrorSAG);
            
            console.log(validate.getIEA());
            
            // close db connections
            //if (closeUsers) {closeUsers();}
            //if (closeSAG) {closeSAG();}
            return;
        }
        
        var docCount = 2;
        
        // TODO ignore value if field is not required and validation fails
        var user = new User({
            'name': row[3]
        });
        
        var sagCustomer = new SagCustomer({
            'region': row[0],
            'branch': row[1],
            'customerNr': row[2],
            'email': row[3],
            'company': row[4],
            'lastName': row[5],
            'firstName': row[6],
            'distributor': row[7]
        });
        
        debugger;
        
        /*User.collection.findOne({name: row[3]}, {_id: 1}, function (err, item) {
            
            if (err) {
                //next();
                console.log(err);
            }
            
            // upsert
            if (item && item._id) {
                
                console.log("FOUND:");
                console.log(item._id);
                User.collection.update({_id: item._id}, {$set: {}}, {upsert: true}, function (err) {
                    
                    if (err) {
                        
                    }
                    
                    next();
                });
            
            // insert
            } else {
                
                console.log("NOT FOUND:");
                console.log(item);
            }
        });
        
        // TODO save relations
        user.save(function(err) {
            
            if (err) {
                //console.log(err);
                ++lqErrorUser;
            } else {
                ++lqCountUser;
            }
            
            //if (--docCount < 1) {next();}
        });
        
        sagCustomer.save(function(err) {
            
            if (err) {
                //console.log(err);
                ++lqErrorSAG;
            } else {
                ++lqCountSAG;
            }
            
            //if (--docCount < 1) {next();}
        });*/
    });
}

connect("crm2", function(err, db) {
    
    if (err) {
        return console.log(err);
    }
    
    // create models
    var User = db.model('User', UserSchema);
    var SagCustomer = db.model('SagCustomer', SagCustomerSchema);
    var EndConsumer = db.model('EndConsumer', EndConsumerSchema);
    
    parseLqUserData(User, SagCustomer);
});

/*CSV.parse(liqshop_users, {delimiter: ";"}, function (err, row, next) {
    
    // on error
    if (err) {
        return console.log(err);
    }
    
    // on finish
    if (row === null) {
        
        // print stats
        printStats("user (LQ)", lqCountUser, lqIncompleteUser, lqErrorUser);
        printStats("SAG Customer (LQ)", lqCountSAG, lqIncompleteSAG, lqErrorSAG);
        
        // close db connections
        if (closeUsers) {closeUsers();}
        if (closeSAG) {closeSAG();}
        return;
    }
    
    var docCount = 1;
    var user = buildUserLq(row);
    var sagCustomer = buildSAGCustomerLq(row);
    
    // create user document
    if (user) {
        
        // TODO get ids from related items and save them in the _itmes property
        
        db("crm2", "users", function(err, col_user, close) {
            
            closeUsers = close;
            
            if (!err) {
                    
                col_user.update({username: user.username}, {$set: user}, {upsert: true}, function(err) {
                    
                    if (err) {
                        // log
                        ++lqErrorUser;
                    
                    } else {
                        
                        ++lqCountUser;
                    }
                    
                    if (--docCount < 1) {next();}
                });
            
            } else {
                
                ++lqErrorUser;
                if (--docCount < 1) {next();}
            }
        });
    
    } else {
        
        ++lqIncompleteUser;
        if (--docCount < 1) {next();}
    }
    
    // create SAG Customer document
    if (sagCustomer) {
        
        db("crm2", "sag_customers", function(err, col_user) {
        
            if (!err) {
                    
                col_user.update({customerNr: sagCustomer.customerNr}, {$set: sagCustomer}, {upsert: true}, function(err) {
                    
                    if (err) {
                        // log
                        ++lqErrorSAG;
                        
                    } else {
                        
                        ++lqCountSAG;
                    }
                    
                    if (--docCount < 1) {next();}
                });
                
            } else {
                
                ++lqErrorSAG;
                if (--docCount < 1) {next();}
            }
        });
        
    } else {
        
        ++lqIncompleteSAG;
        if (--docCount < 1) {next();}
    }
});*/

// save happybonus users
/*CSV.parse(happybonus_users, {delimiter: ";"}, function (err, row, next) {

    if (err) {
        return console.log(err);
    }

    if (row !== null) {
        console.log("HAPPYBONUS: " + row);
        //return next();
    }
    
    // finish
});*/

// save end customers
/*CSV.parse(end_customers, {delimiter: ";", charset: "win1250"}, function (err, row, next) {

    if (err) {
        return console.log(err);
    }

    if (row !== null) {
        console.log("CUSTOMER: " + row);
        //return next();
    }
    
    // finish
});*/
