var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var patientinfoSchema = new Schema({
    "userid": ObjectId,
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
    "hash": String
}, { collection: 'patientInfo' });

module.exports = mongoose.model('patientinfo', patientinfoSchema);