var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var medstaffSchema = new Schema({
    "userid": String,
    "name":String,
    "medCode": String,
    "department": String,
    "job": String,
    "patients": Array,
    "hash": String,
    "institution": String
}, { collection: 'medicalStaff' });

module.exports = mongoose.model('medicalstaff', medstaffSchema);
