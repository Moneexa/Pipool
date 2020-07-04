var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var InfluencerSchema = new Schema({
	'channelName' : String,
	'channelId' : String,
	'followers': Number,
	'channelType': String
});

module.exports = mongoose.model('Influencer', InfluencerSchema);
