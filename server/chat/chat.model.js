var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    'brand': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'brand'
    },
    'channel': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Channel'
    },
    'campaign': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Campaign'
    },
    'texts': [{
        date: Date,
        fromBrand: Boolean,
        value: String
    }]
});

module.exports = mongoose.model('Chat', ChatSchema);