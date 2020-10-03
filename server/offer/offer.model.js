var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfferSchema = new Schema({
    'createdBy': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    'brandId': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Brand'
    },
    'campaignId': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Campaign'
    },
    'channelId': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Channel'

    },
    'proposal': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Proposal'
    },
    'price': Number,
    'acceptanceStatus': {
        type: String,
        required: true
    },
    'paymentVerified': {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('Offer', OfferSchema);