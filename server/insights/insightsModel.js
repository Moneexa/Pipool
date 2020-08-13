var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InsightsSchema = new Schema({
	'channelName': String,
	'followers': Number,
	'channelId': String,
	'channelType': String,
	'Gender': {
		type: Array,
		value: {
			"gender": String,
			"genderCount": Number
		}
	},
	'AgeGroup': {
		type: Array,
		value: {
			"ageGroup": String,
			"ageGroupCount": Number
		}

	},
	'Cities': {
		type: Array,
		value: {
			"cityName": String,
			"noOfAudience": Number,
			
		}
	},
	'Countries': {
		type: Array,
		value: {
			"countryName": String,
			"noOfAudience": Number
		}
	},
	'lastFetched': Date,
	'response':{
		type:Array,
		value:{
			"responseType" :String,
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
