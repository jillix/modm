// validate a string
function string (data) {
    
    return typeof data === "string" ? true : false;
};
exports.string = string;

// validate a number
function number (data) {
    
    return typeof data === "number" ? true : false;
};
exports.number = number;

// validate an array
function array (data) {
    
    return data instanceof Array ? true : false;
};
exports.array = array;

// validate an object
function object (data) {
    
    return data instanceof Object ? true : false;
};
exports.object = object;

// validate an boolean
function object (data) {
    
    return data.constructor.name === "Boolean" ? true : false;
};
exports.object = object;

// validate an date
function date (data) {
    
    return data instanceof Date ? true : false;
};
exports.date = date;

// validate email
var special = "!#$%&'*+/=?^`{|}~";
var ascii = "a-z0-9._\\-";
var umlaut = "àáâãäåæāăąçćĉċčďđèéêëēĕėęěĝğġģĥħìíîïĩīĭįıðĵķĸĺļľŀłñńņňŉŋòóôõöøō" +
             "ŏőœŕŗřśŝšșßťŧțùúûüũūŭůűųŵýÿŷźżžþΐάέήίΰαβγδεζηθ" +
             "ικλμνξοπρςστυφχψωϊϋόύώабвгдежзийклмнопрстуфхцчшщъыьэюяἀἁἂἃἄἅἆἇ" +
             "ἐἑἒἓἔἕἠἡἢἣἤἥἦἧἰἱἲἳἴἵἶἷὀὁὂὃὄὅὐὑὒὓὔὕὖὗὠὡὢὣὤὥὦὧὰάὲέὴήὶίὸόὺύὼώᾀᾁᾂᾃᾄᾅᾆ" +
             "ᾇᾐᾑᾒᾓᾔᾕᾖᾗᾠᾡᾢᾣᾤᾥᾦᾧᾰᾱᾲᾳᾴᾶᾷῂῃῄῆῇῐῑῒΐῖῗῠῡῢΰῤῥῦῧῲῳῴῶῷ";

var IEA = {};

function email(string) {
    
    if (!string) {
        return false;
    }
    
    // remove all space
    //string = string.replace(/[°¨[\]\s]*/g, "").toLowerCase();
    var string2 = string.toLowerCase().replace(new RegExp("[^" + ascii + special + umlaut + "@]", "g"), "");
    
    // test pattern
    //return new RegExp("^[" + ascii + special + umlaut + "]+@[" + ascii + umlaut + "]+\.[a-z]+$").test(string);
    var pattern = new RegExp("^[" + ascii + special + umlaut + "]+@[" + ascii + umlaut + "]+\.[a-z]+$");//.test(string);
    
    if (pattern.test(string2)) {
        return true;
    }
    
    if (!IEA[string2]) {
        IEA[string2] = [string, 0];
    }
    
    ++IEA[string2][1];
    
    return false;
};

exports.email = email;
exports.getIEA = function () {
    return IEA;
};

// vaidate url