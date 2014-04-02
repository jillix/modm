var ObjectId = require('pongo').ObjectId;

function convert (type, value) {

    if (typeof value  === 'string') {

        // convert to number
        if (type === 'number') {
            if (value.indexOf('.') > -1) {
                value = parseFloat(value, 10);
            } else {
                value = parseInt(value, 10);
            }

            return isNaN(value) ? new Error('Number conversion failed.') : value;
        }

        // convert to boolean
        if (type === 'boolean') {

            if (value === 'false' || value === '0') {
                return false;
            }

            if (value === 'true' || value === '1') {
                return true;
            }

            return new Error('Boolean conversion failed.');
        }

        // convert to objectid
        if (type === 'objectid') {
            try {
                value = ObjectId(value);
            } catch (err) {
                value = new Error('ObjectId conversion failed: ' + value);
            }

            return value;
        }
    }

    if (value && value.constructor.name !== 'Date' && type === 'date') {
        value = new Date(value);

        if (isNaN(value.valueOf())) {
            return new Error('Date conversion failed:');
        }

        return value;
    }

    return value;
}

module.exports = convert;

