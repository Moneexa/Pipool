var proposalModel = require('./proposalModel');


/**
 * proposalController.js
 *
 * @description :: Server-side logic for managing campaigns.
 */
module.exports = {

    /**
     * campaignController.list()
     */
    list: function (req, res) {
        proposalModel.find({ createdBy: res.locals.user.id }, function (err, proposals) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting campaign.',
                    error: err
                });
            }
            return res.json(proposals);
        });
    },

    /**
     * campaignController.show()
     */
    show: async function (req, res) {
        var id = req.params.campaignId;
        console.log(id)
        const proposal=await proposalModel.findOne({ campaignId: id, createdBy: res.locals.user.id }) 
            
            if (!proposal) {
                res.status(404).json({
                    message: 'No such campaign'
                });
            }
            return res.json(proposal);
        
    },

    /**
     * campaignController.create()
     */
    create: function (req, res) {
        console.log(req.body.proposal)
        console.log(req.body.cost)
        console.log(req.body.dateOfSubmission)
        console.log(req.body.campaignId)

        const props = proposalModel.findOne({ createdBy: res.locals.user.id }, function (err, proposal) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting such proposal.',
                    error: err
                });
            }
            if (!proposal) {
                var proposal = new proposalModel({
                    proposal: req.body.proposal,
                    cost: req.body.cost,
                    dateOfSubmission: req.body.dateOfSubmission,
                    // channelId: req.body.channelId,
                    campaignId: req.body.campaignId,
        
                    createdBy: res.locals.user.id
        
        
                });
        
                proposal.save(function (err, proposal) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when creating campaign',
                            error: err
                        });
                    }
                    return res.status(201).json(proposal);
                });
            }
            else{
                return res.status(405).send({"message": "can't submit proposal,alread exists"});
            }
        
        
        })

       
    }
};
