var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checkupsSchema = new Schema({
    "patientCode": String,
    "code": String,
    "diagnosis": String,
    "attendant": String,
    "department": String,
    "date": String,
    "institution": String,
    "hash": String,
    "remarks": String
});

module.exports = mongoose.model('checkup', checkupsSchema);
