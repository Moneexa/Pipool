var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var brandSchema = new Schema({
	'name' : String,
	'logo' : String,
	'contactName' : String,
	'skype' :String,
	'description' : String,
	'website' :String,
	'hashTags' :String,
	'phoneNo' :String,
	'address':String,
	'postalCode' :String,
	'city' :String,
	'country' :String,
	'createdBy' : [
		{type: Schema.Types.ObjectId, ref: 'User'}
	  ]

});

module.exports = mongoose.model('brand', brandSchema);
