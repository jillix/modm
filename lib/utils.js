exports.clone = function (object) {
    
    function Model () {}
    Model.prototype = object;
    return new Model();
};