var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);
