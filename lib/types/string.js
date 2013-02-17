// manipulation methods
var manipulators = {
    
    pre: function (valueA, valueB) {
        return valueB + valueA;
    },
    
    post: function (valueA, valueB) {
        return valueA + valueB;
    }
}

function prepare (options) {
    
}

function modify (options, document) {
    
}

exports.prepare = prepare;
exports.modify = modify;
