var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campaignSchema = new Schema({
	'serviceName': String,
	'serviceDescription': String,
	'category': String,
	'coverImage': String,
	'callForAction': String,
	'briefInfluencers': String,
	'do': String,
	'dont' : String,
	'caption' : String,
	'productNeed': String,
	'gender': String,
	'location': String,
	'age': String,
	'minFollowers': String,
	'postingLanguages': String,
	'influencers': String,
	'createdBy': [
		{ type: Schema.Types.ObjectId, ref: 'User' }
	]
});

module.exports = mongoose.model('campaign', campaignSchema);
