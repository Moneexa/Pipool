var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChannelSchema = new Schema({
	'channelName': String,
	'channelId': String,
	'followers': Number,
	'channelType': String,
	'createdBy': {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	'category' : String,
	basicPrice: {
		type: Number,
		required: true
	},
	basicDescription: {
		type: String,
		required: true
	},
	standardPrice: {
		type: Number,
		required: true
	},
	standardDescription: {
		type: String,
		required: true
	},
	premiumPrice: {
		type: Number,
		required: true
	},
	premiumDescription: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Channel', ChannelSchema);
