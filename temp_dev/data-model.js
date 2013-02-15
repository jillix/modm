/*
    item:
    - array with links to other items => property of a document/object
    - diffrent types of items => mongodb collections
    - instances of cell types => documents/objects
*/

// indexes
db.items.ensureIndex({'_item.id': 1});
db.items.ensureIndex({'_item.type': 1});

// sample object
var item = {
    "_id"   : "MongoDBID",     // item instance id
    "_items" : [iid, iid, ..]     // items
    // ..additional data
};

var iid = {
    id: ObjectId(""), // ..or uuid
    type: ObjectId("") //"typeName"
    // ..additional data
}

    
// types
db.types.ensureIndex({'_name': 1},  {unique: true});

var type = {
    "name": "typeName",
    // ..additional data
}
///////

var user = {
    "_id" : ObjectId("4d6bf563c2dbe2c5f220dc78"),
    _items: [
        {
            id: "HBID_X",
            type: "happybonus"
        },
        {
            id: "LQID_X",
            type: "liqshop"
        },
        {
            id: "ROLE_A",
            type: "role"
        },
        {
            id: "happybonusRole",
            type: "role"
        },
        {
            id: "ROLE_A",
            type: "role"
        },
        {
            id: "VG_DD_CH",
            type: "vertiebsgeselschaft"
        }
    ],
	"active" : 1,
	"adress" : {
		"work" : {
			"department" : "Automobile",
			"location" : "Hägendorf",
			"street" : "Solothurnerstrasse 27",
			"zip" : "4614"
		}
	},
	"auth" : {
		"pub" : "worklift@bluewin.ch"
	},
	"contact" : {
		"email" : {
			"work" : "worklift@bluewin.ch"
		},
		"phone" : {
			"work0" : "0622163355"
		}
	},
	"groups" : [
		"dd_ch"
	],
	"meta" : [
		"10088",
		"studer",
		"anton",
		"solothurnerstrasse",
		"27",
		"4614",
		"hägendorf",
		"worklift@bluewin.ch"
	],
	"person" : {
		"fname" : "Anton",
		"lname" : "Studer"
	},
	"system" : {
		"biz_field" : "KTM-GFG",
		"branch" : "OEN",
		"cnr" : "10088",
		"region" : "RML",
		"sow" : "5F",
		"vis_region" : "MIF04AD Oensingen - Langnau"
	}
};

var hbitem = {
    _id: "HBID_X",
    _items: [],
    "happybonus" : {
		"points" : 0,
		"since" : 20120321
	}
}
    
var type = {
    _name: "happybonus",
    // ..additional data
}
