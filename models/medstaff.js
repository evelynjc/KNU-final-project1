var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var medstaffSchema = new Schema({
    "userid": ObjectId,
    "medCode": String,
    "department": String,
    "job": String,
    "patients": Array,
    "hash": String
}, { collection: 'medicalStaff' });

module.exports = mongoose.model('medicalstaff', medstaffSchema);
