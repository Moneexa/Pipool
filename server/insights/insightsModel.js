var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InsightsSchema = new Schema({
	'channelName': String,
	'followers': Number,
	'channelId': String,
	'channelType': String,
	'gender': {
		type: Array,
		value: {
			"gender": String,
			"genderCount": Number
		}
	},
	'ageGroup': {
		type: Array,
		value: {
			"ageGroup": String,
			"ageGroupCount": Number
		}

	},
	'cities': {
		type: Array,
		value: {
			"cityName": String,
			"noOfAudience": Number,
			
		}
	},
	'countries': {
		type: Array,
		value: {
			"countryName": String,
			"noOfAudience": Number
		}
	},
	'lastFetched': Date,
	'impressions':{
		type:Array,
		value:{
			"date":String,
			"count" : Number
		}
	},
	'reach':{
		type:Array,
		value:{
			"date":String,
			"count" : Number
		}
	},
	'createdBy': {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},

});

module.exports = mongoose.model('Insights', InsightsSchema);
