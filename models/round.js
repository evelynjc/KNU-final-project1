var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var roundsSchema = new Schema({
    "patientCode": ObjectId,
    "time": String,
    "bodyTemp": String,
    "pulse": String,
    "respiration": String,
    "remarks": String,
    "hash": String
});

module.exports = mongoose.model('round', roundsSchema);
