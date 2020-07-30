var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InsightsSchema = new Schema({
	'channelName': String,
	'followers': Number,
	'channelType': String,
	
});

module.exports = mongoose.model('Insights', InsightsSchema);
