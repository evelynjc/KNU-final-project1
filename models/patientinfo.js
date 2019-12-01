var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientinfoSchema = new Schema({
    "userid": String,
    "patientCode": String,
    "name": String,
    "sex": String,
    "attendant": String,
    "ward": String,
    "room": String,
    "institution": String,
    "date": String,
    "type": String,
    "condition": String,
    "hash": String,
    "department": String
}, { collection: 'patientInfo' });

module.exports = mongoose.model('patientinfo', patientinfoSchema);
