var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var InfluencerSchema = new Schema({
	'channelName' : String,
	'channelId' : String,
	'followers': Number,
	'channelType': String,'createdBy' : [
		{type: Schema.Types.ObjectId, ref: 'User'}
	  ]
});

module.exports = mongoose.model('Influencer', InfluencerSchema);
