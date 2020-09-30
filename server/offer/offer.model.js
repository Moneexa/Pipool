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
        type: Object,

    },
    'acceptanceStatus': {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Offer', OfferSchema);