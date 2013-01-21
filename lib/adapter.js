// TODO operators
function checkDocument (document, callback) {
    
    for (var field in this.schema.paths) {
        
        if (document[field]) {
            
            if (!this.schema.paths[field].validate(document[field])) {
                
                if (typeof callback === 'function') {
                     callback(new Error('Validation Error'));
                }
                
                return;
            };
        }
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
    if (document && !checkDocument.call(this, document, callback)) {
        return;
    }
    
    this.collection[method].apply(this.collection, args);
}

module.exports = adapter;
