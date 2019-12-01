var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var prescriptionsSchema = new Schema({
    "patientCode": String,
    "code": String,
    "attendant": String,
    "medication": String,
    "department": String,
    "date": String,
    "institution": String,
    "remarks": String,
    "hash": String
});

module.exports = mongoose.model('prescription', prescriptionsSchema);
