var valify = require("./manipulator");
var defaultValue = require("./default");
var jxUtils = require("jxutils");

function validateValue(value, path, type, paths) {

    if (value && value.constructor.name === "Object" && type !== "object") {
        return handleValidation.call(this, value, path, paths);
    } else if (type) {
        return valify(this._schema.paths[path], value, path);
    } else {
        return ["Path not in schema PATH: " + path];
    }
}

function handleValidation(document, prefix, paths) {

    var result;
    var self = this;

    if (document && document.constructor === Array) {
        var errors = [];
        for (var i = 0; i < document.length; ++i) {
            result = handleValidation.call(self, document[i], prefix, paths);

            if (result[0]) {
                errors.push(result);
            }
        }

        if (errors.length) {
            return errors[0];
        }

        return [null, document, paths];
    }

    for (var field in document) {

        // get field without operators
        var _field = field[0] === "$" ? "" : field.replace(/\.\$|\[[0-9]+\]/, "");

        // get current path with prefix
        var path = prefix ? prefix + (_field ? "." + _field : "") : _field;

        // get schema type
        var type = this._schema.paths[path] ? this._schema.paths[path].type : null;

        if (path !== "" && type) {
            paths[path] = type;
        }

        if (document[field] && document[field].constructor.name === "Array" && type !== "array") {

            for (var i in document[field]) {

                result = validateValue.call(this, document[field][i], path, type, paths);

                if (result[0]) {
                    return result;
                }

                document[field][i] = result[1];
            }
        } else {

            result = validateValue.call(this, document[field], path, type, paths);

            if (result[0]) {
                return result;
            }

            document[field] = result[1];
        }
    }

    return [null, document, paths];
}

function adapter(method, args, docIndex) {

    if (!this._schema || !this._schema.paths) {
        return;
    }

    var self = this;
    args = Array.prototype.slice.call(args);

    // connect to db
    if (!self.db.connection) {

        var caller = adapter.caller;
        return self.db.connect(function(err, db) {

            caller.apply(self, args);
        });
    }

    /////////////////////////////////////////////////////////////////////

    // get callback ref
    var callback = args[args.length - 1];

    // create collection instance
    if (typeof this.collection === "string") {
        self.collection = self.db.connection.collection(self.collection);
    }

    if (!self.collection[method]) {
        return;
    }

    // validate the document
    if (args[docIndex]) {

        var result = handleValidation.call(self, args[docIndex], "", {});

        if (result[0]) {
            var error = new Error(result[0]);
            // TODO appropriate status codes
            error.statusCode = 400;
            return callback(error);
        }

        // set default value if field doesn"t exists
        if (self._schema.default) {
            for (var field in self._schema.default) {
                if (typeof result[2][field] === "undefined" && self._schema.paths[field]) {

                    var value = defaultValue(self._schema.paths[field], self._schema.default[field]);

                    // handle default value errors
                    if (value.constructor.name === "Error") {
                        return callback(value);
                    }

                    // add default value to document
                    if (method !== "insert") {
                        result[1].$set[field] = value;
                    } else {
                        result[1][field] = value;
                    }
                }
            }
        }

        // check if required fields exists when insert or upsert
        // TODO it could be, that not all required fields are in the document on an upsert.
        if (
            self._schema.required &&
            method === "insert" ||
            (method === "update" &&
                (args[2] && args[2].upsert ||
                    (Object.keys(args[docIndex])[0] || "")[0] !== "$"
                )
            )
        ) {

            // iterate the required fields
            for (var i = 0, l = self._schema.required.length; i < l; ++i) {

                // get the current required field and its value
                var cRequiredField = self._schema.required[i];
                var requiredFieldValue = jxUtils.findValue(result[1], cRequiredField);

                // found an invalid value
                if (cRequiredField !== "_id" && !requiredFieldValue && [0, false].indexOf(requiredFieldValue) === -1) {

                    // is the result an object? then just callback an error
                    // if it"s an array, iterate it
                    if (result[1] && result[1].constructor.name === "Object") {
                        return callback(new Error("Missing required field: " + self._schema.required[i]));
                    } else if (result[1] && result[1].constructor.name === "Array") {

                        // each result object
                        for (var ii = 0; ii < result[1].length; ++ii) {

                            // get the object and find the required value
                            var cResObj = result[1][ii];
                            var requiredFieldValue = jxUtils.findValue(cResObj, cRequiredField);

                            // found an invalid value, callback an error
                            if (cRequiredField !== "_id" && !requiredFieldValue && requiredFieldValue !== 0) {
                                return callback(new Error("Missing required field: " + cRequiredField));
                            }
                        }
                    }
                }
            }
            // check if required fields are trying to be deleted
        } else if (method === "update" && (!args[2] || !args[2].upsert)) {

            // iterate the required fields
            for (var i = 0, l = self._schema.required.length; i < l; ++i) {

                // handle array
                var resultArr = [];
                if (result[1] && result[1].constructor.name === "Object") {
                    resultArr.push(result[1]);
                } else if (result[1] && result[1].constructor.name === "Array") {
                    resultArr = result[1];
                }

                // iterate the result array
                for (var ii = 0; ii < resultArr.length; ++ii) {

                    var cResObj = resultArr[ii];

                    // get the current required field and its value
                    var cRequiredField = self._schema.required[i];

                    // iterate the operators
                    for (var operator in cResObj) {
                        if (operator === "$unset") {

                            // found a require field
                            if (cResObj.$unset.hasOwnProperty(cRequiredField)) {
                                return callback(new Error("Missing required field: " + self._schema.required[i]));
                            }
                        } else if (operator === "$set") {

                            // prevent $set: {field: ""} case
                            if (cResObj.$set.hasOwnProperty(cRequiredField) && cResObj.$set[cRequiredField] === "") {
                                return callback(new Error("Missing required field: " + self._schema.required[i]));
                            }
                        }
                    }
                }
            }
        }

        args[docIndex] = result[1];
    }

    return self.collection[method].apply(self.collection, args);
}

module.exports = adapter;
