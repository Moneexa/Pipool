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
	'PhoneNo' :String,
	'Address':String,
	'PostalCode' :String,
	'City' :String,
	'Country' :String

});

module.exports = mongoose.model('brand', brandSchema);
