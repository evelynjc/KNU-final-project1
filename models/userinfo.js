var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var userinfoSchema = new Schema({
    "id": String,
    "password": String,
    "hash": String
}, { collection: 'userinfo' });

module.exports = mongoose.model('userinfo', userinfoSchema);
