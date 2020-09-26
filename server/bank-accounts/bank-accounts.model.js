var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BankAccountSchema = new Schema({
    'createdBy': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    'stripeAccountId': {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('BankAccount', BankAccountSchema);