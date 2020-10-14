var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportsSchema = new Schema({

    'message': String,
    'author':
    {
        type: Schema.Types.ObjectId, ref: 'Channel'
    },
    'campaign': {
        type: Schema.Types.ObjectId, ref: 'Campaign'
    },
    'dateOfSubmission' : Date

})

module.exports = mongoose.model('Reports', reportsSchema)