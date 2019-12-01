var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roundsSchema = new Schema({
    "patientCode": String,
    "time": String,
    "bodyTemp": String,
    "pulse": String,
    "respiration": String,
    "remarks": String,
    "hash": String
});

module.exports = mongoose.model('round', roundsSchema);
