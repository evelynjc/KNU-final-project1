var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var operationsSchema = new Schema({
    "patinetCode": String,
    "code": String,
    "date": String,
    "type": String,
    "operation": String,
    "attendant": String,
    "institution": String,
    "remarks": String,
    "hash": String
});

module.exports = mongoose.model('operation', operationsSchema);
