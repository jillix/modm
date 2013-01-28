/* TODO operators
var document = {
    
    // validate these operators
    $set: {name: { $whatever: { first: 'doch', last: 'trucken'}},
    $addToSet: {field4: 'value'},
    $pushAll: {field8: ['value']},
    $push: {field9: 'value'},
    
    // ignore these operators for validation
    $pullAll: {field6: ['value']},
    $pull: {field7: 'value'},
    $pop: {field5: 'value'},
    $rename: {field1: 'value'},
    $unset: {field3: 'value'},
    $inc: {field2: 'value'},
    $bit: { field10: { and: 5 } }
};*/

// INFO: when an item is pushed or pulled in or from an array, the array length is not validated.
// INFO: results of atomic operations are not validated.

function funkenDoch () {
    
    // ============ BLOCK
    if (document[field][i].constructor.name === 'Object') {
        validateDocument.call(this, document[field][i], callback, prefix ? prefix + (_field ? '.' + _field : '') : _field);
    } else if (_field) {
        console.log('PATH: ' + (prefix ? prefix + '.' + _field : _field) + ': ' + document[field][i]);
    }
    // ============ BLOCK
}

// TODO nested objects
var x = true;
function validateDocument (document, callback, prefix) {
    
    prefix = prefix || '';
    
    if (x){
        x =false
        console.log(this.schema.paths);
    }
    
    for (var field in document) {
        
        var _field = field[0] === '$' ? '' : field;
        
        // remove the positional operators
        _field = _field.replace(/\.\$|\.[0-9\[\]]+/, '');
        
        // TODO handle arrays in document
        if (document[field].constructor.name === 'Array') {
            
            for (var i in document[field]) {
                
                // ============ BLOCK
                if (document[field][i].constructor.name === 'Object') {
                    validateDocument.call(this, document[field][i], callback, prefix ? prefix + (_field ? '.' + _field : '') : _field);
                } else if (_field) {
                    
                    console.log(
                        'DATA: ' + (prefix ? prefix + '.' + _field : _field) + ': ' + document[field][i] +
                        ' | SCHEMA: ' + this.schema.paths[(prefix ? prefix + '.' + _field : _field)]
                    );
                }
                // ============ BLOCK
            
            }
        
        // ============ BLOCK
        } else if (document[field].constructor.name === 'Object') {
            validateDocument.call(this, document[field], callback, prefix ? prefix + (_field ? '.' + _field : '') : _field);
        } else if (_field) {
            
            console.log(
                'DATA: ' + (prefix ? prefix + '.' + _field : _field) + ': ' + document[field] +
                ' | SCHEMA: ' + this.schema.paths[(prefix ? prefix + '.' + _field : _field)]
            );
        }
        // ============ BLOCK
    }
    
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
