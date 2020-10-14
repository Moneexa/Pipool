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
	'brand': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'brand'
    },
	'createdBy': [
		{ type: Schema.Types.ObjectId, ref: 'User' }
	],
	'reportedBy' : [
		{
			type: Schema.Types.ObjectId, ref: 'Channel'
		}
	]
});

module.exports = mongoose.model('Campaign', campaignSchema);
