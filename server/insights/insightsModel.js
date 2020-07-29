var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChannelSchema = new Schema({
	'channelName': String,
	'followers': Number,
	'channelType': String,
	
});

module.exports = mongoose.model('Channel', ChannelSchema);
