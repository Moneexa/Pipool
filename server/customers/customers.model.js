var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    'createdBy': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    'customerId': {
        type: String,
        required: true
    },
    'setupIntent': String
});

module.exports = mongoose.model('Customer', CustomerSchema);