var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
    'token': {
        'required': true,
        'type': String
    }
});

module.exports = mongoose.model('Admin', AdminSchema);
