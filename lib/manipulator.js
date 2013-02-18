/*
    ALL | type: ...,
    ALL | required: true,
    ALL | default: 'default'
    ALL | validate: function () {}, // | 'email', '...'
    ALL | manipulate: function () {},
    ALL | live: true,
    
    STR | pre: 'tru', => check string
    STR | post: 'cken', => check string
    STR | charStyle: 'normal', // normal | uppercase | lowercase => convert to function name
    STR | trim: true, => convert to boolean
    STR,BUF,ARY | maxLength: 5, => set to zero, if the number is negative
    STR,BUF,ARY | minLength: 1, => set to zero, if the number is negative
    NUM | max: 5, => check number, convert to number
    NUM | min: -3 => check number, convert to number
*/

var types = {
    array: require('./types/array'),
    boolean: require('./types/boolean'),
    buffer: require('./types/buffer'),
    date: require('./types/date'),
    number: require('./types/number'),
    object: require('./types/object'),
    objectid: require('./types/objectid'),
    string: require('./types/string')
};

var options = {
    /*
    // special
    required: toBoolean,
    live: toBoolean,
    default:
    
    // manipulators
    manipulate: function (value) {
        return typeof value === 'function' ? value : null;
    },
    
    charStyle: function (value) {
        
        value = value.toLowerCase();
        
        if (value === 'lowercase') {
            return 'toLowerCase';
        }
        
        if (value === 'uppercase') {
            return 'toUpperCase';
        }
        
        return null;
    },
    
    trim: toBoolean,
    pre: checkString,
    post: checkString,
    
    // validators
    maxLength: checkLength,
    minLength: checkLength,
    max: toNumber,
    min: toNumber*/
}

// adapter (return document)
module.exports = function (options, document) {
    
    //if (types[options.type] && typeof types[options.type].modify === 'function') {
    //    document = types[options.type].modify(options, document);
    //}
    
    //console.log(options);
    return document;
};
