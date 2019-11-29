var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var checkupsSchema = new Schema({
    "patinetCode": ObjectId,
    "code": String,
    "attendant": String,
    "medication": String,
    "department": String,
    "date": String,
    "institution": String,
    "remarks": String,
    "hash": String
});

module.exports = mongoose.model('checkup', checkupsSchema);