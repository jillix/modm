function Document (data) {
    
    this.data = data;
}

Document.prototype.save = function () {
    console.log(this);
};

Document.prototype.update = function () {
    
};

Document.prototype.insert = function () {

};

Document.prototype.remove = function () {
    
};

module.exports = Document;
