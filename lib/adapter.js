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

// INFO: when an item is pushed or pulled in or from an array, the array length is not validated.
// INFO: atomic operations are not validated.
// INFO: the $bit atomic operator is not validated.
function checkDocument (document, callback) {
    
    // update
    document = {
        $set: {lname: 'value'},
        $rename: {field: 'value'},
        $inc: {field: 'value'},
        $unset: {field: 'value'},
        
        $addToSet: {field: 'value'},
        $pop: {field: 'value'},
        $pullAll: {field: ['value']},
        $pull: {field: 'value'},
        $pushAll: {field: ['value']},
        $push: {field: 'value'},
        
        $bit: { field: { and: 5 } }
    };
    
    var insert = {
        field: 'value'
    };
    
    for (var field in document) {
        
        console.log(field);
    }
    
    /*for (var field in this.schema.paths) {
        
        if (document[field]) {
            
            if (!this.schema.paths[field].validate(document[field])) {
                
                if (typeof callback === 'function') {
                     callback(new Error('Validation Error'));
                }
                
                return;
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
    if (document && !checkDocument.call(this, document, callback)) {
        return;
    }
    
    this.collection[method].apply(this.collection, args);
}

module.exports = adapter;
