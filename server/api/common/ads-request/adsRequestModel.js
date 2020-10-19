var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adsRequestSchema = new Schema({
	'createdBy': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    'brand': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'brand'
    },
    'campaign': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Campaign'
    }
});

module.exports = mongoose.model('AdsRequest', adsRequestSchema);
