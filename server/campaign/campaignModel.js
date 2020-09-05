var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campaignSchema = new Schema({
	'serviceName': String,
	'serviceDescription': String,
	'category': String,
	'coverImage': String,
	'callForAction': String,
	'briefInfluencers': String,
	'do': Array,
	'dont' : Array,
	'caption' : String,
	'productNeed': String,
	'gender': String,
	'location': String,
	'age': String,
	'minFollowers': String,
	'postingLanguages': String,
	'interests': Array,
	'createdBy': [
		{ type: Schema.Types.ObjectId, ref: 'User' }
	]
});

module.exports = mongoose.model('Campaign', campaignSchema);
