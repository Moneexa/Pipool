var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProposalSchema = new Schema({
    'proposal': String,
    'channelId':
    {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Channel'
    },
    'campaignId':
    {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Campaign'
    },
    'cost': String,
    'dateOfSubmission': String,
    'createdBy': {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Proposal', ProposalSchema);
