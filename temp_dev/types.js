exports.string = function (obj) {
    
    return String;
};

exports.number = function (obj) {
    
    return Number;
};

exports.boolean = function (obj) {
    
    return Boolean;
};

exports.object = function (obj) {
    
    return Object;
};

exports.array = function (obj) {
    
    return Array;
};

exports.date = function (obj) {
    
    return Date;
};

// nodejs types

exports.buffer = function (obj) {
    
    return Buffer;
};

exports.objectid = function (obj) {
    
    return obj;
};
