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
	'category'
		: String
});

module.exports = mongoose.model('Channel', ChannelSchema);
