var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProposalSchema = new Schema({
    'proposal': String,
    'channelId':
    {
        type: Schema.Types.ObjectId,
        ref: 'Channel'
    },
    'campaignId':
    {
        type: Schema.Types.ObjectId,
        ref: 'Campaign'
    },
    'brandId':
    {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    },
    'cost': String,
    'dateOfSubmission': String,
    'createdBy': {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Proposal', ProposalSchema);
