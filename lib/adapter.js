// TODO do we need callbacks here? yes! because of the validation errors, stupid!
function adapter (method, args, docIndex) {
    
    // TODO create collections
    if (!this.collection) {
        this.collection = this.db.collection(this.colName);
    }
    
    if (!this.collection[method]) {
        return null;
    }
    
    // find the document
    if (docIndex = parseInt(docIndex)) {
        
        // TODO validate the document
    }
    
    args = Array.prototype.slice.call(args);
    this.collection[method].apply(this.collection, args);
}

module.exports = adapter;
