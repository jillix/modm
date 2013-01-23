// TODO operators
/*
    FIELDS
    $inc
    $rename
    $set
    $unset
    
    ARRAY
    $
    $addToSet
    $pop
    $pullAll
    $pull
    $pushAll
    $push
    
    BITWISE
    $bit
*/

// update
var document = {
    $set: {lname: 'value'},
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

// INFO: when an item is pushed or pulled in or from an array, the array length is not validated.
// INFO: results of atomic operations are not validated.

// TODO normalize paths and remove operators.
//      the goal is to reconstruct the schema paths
function validateDocument (documentt, callback, prefix) {
    
    prefix = prefix || '';
    
    for (var field in document) {
        console.log(field);
        
        if (document[field].constructor.name === 'Object') {
            
            validateDocument.call(this, document[field], callback, field);
        }
    }
    
    /*for (var field in this.schema.paths) {
        
        if (document[field]) {
            
            if (!this.schema.paths[field].validate(document[field])) {
                
                if (typeof callback === 'function') {
                     callback(new Error('Validation Error'));
                }
                
                return false;
            };
        }
    }*/
    
    return true;
}

function adapter (method, args, docIndex) {
    
    if (!this.collection[method]) {
        return;
    }
    
    args = Array.prototype.slice.call(args);
    
    // get callback ref
    var callback = args[args.length-1];
    var document = args[docIndex];
    
    // validate the document
    if (document && !validateDocument.call(this, document, callback)) {
        return;
    }
    
    this.collection[method].apply(this.collection, args);
}

module.exports = adapter;
