var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = new Schema({

    'name': String,
    'fileName': String,
    'createdBy': {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Video', VideoSchema);
