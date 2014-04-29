// validate a data types
exports.string = function (data) {
    return typeof data === "string" ? true : false;
};
exports.number = function (data) {

    if (typeof data === 'number' && (data <= 0 || data >= 0)) {
        return true;
    }

    return false;
};
exports.array = function (data) {
    return data && data.constructor.name === 'Array' ? true : false;
};
exports.object = function (data) {
    return data && data.constructor.name === 'Object' ? true : false;
};
exports.boolean = function (data) {
    return [true, false].indexOf(data) !== -1 ? true : false;
};
exports.buffer = function (data) {
    return data && data.constructor.name === "Buffer" ? true : false;
};
exports.objectid = function (data) {
    return data && data.constructor.name === "ObjectID" ? true : false;
};
exports.date = function (data) {

    // handle special "now" default value
    if (data === 'now') {
        return true;
    }

    return data && data.constructor.name === "Date" ? true : false;
};

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
