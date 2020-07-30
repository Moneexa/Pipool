var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fullName: String,
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
        required: false
    },
    picture: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    company: {
        type: String,
        required: false
    },
    designation: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('User', UserSchema);
