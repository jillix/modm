// INFO: results of atomic operations are not validated.
/*
    ALL | type: ...,
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

var options = {
    /*
    // special
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
module.exports = function (opts, value) {
    
    console.log(arguments);
    
    var result;
    
    for (var option in opts) {
        if (options[option]) {
            
            result = options[option](opts[option], value);
            
            if (result[0]) {
                return result;
            }
        }
    }
    
    //console.log(options);
    return [null, value];//result;
};
