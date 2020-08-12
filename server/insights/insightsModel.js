var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InsightsSchema = new Schema({
	'channelName': String,
	'followers': Number,
	'channelId': String,
	'channelType': String,
	'Gender': Array,
	'AgeGroup': Array,
	'Cities':Array,
	'CityNames':Array,
	'Countries':Array,
	'CountryNames':Array,
	'lastFetched': Date,
	'impressions': Array,
	'followers': Array,
	'reach': Array,
	'createdBy': {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},

});

module.exports = mongoose.model('Insights', InsightsSchema);
