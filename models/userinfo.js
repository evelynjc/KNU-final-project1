var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userinfoSchema = new Schema({
    "id": String,
    "password": String,
    "hash": String
}, { collection: 'userinfo' });

module.exports = mongoose.model('userinfo', userinfoSchema);
