var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var influencerSchema = new Schema({
	'channel_name' : String,
	'channel_id' : String,
	'screen_name' : String,
	'name' : String
});

module.exports = mongoose.model('influencer', influencerSchema);
