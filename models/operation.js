var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var operationsSchema = new Schema({
    "patinetCode": ObjectId,
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
