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
        const proposals = await proposalModel.find({ campaignId: id }).populate({path: 'createdBy', select: 'fullName'});

        if (!proposals) {
            res.status(404).json({
                message: 'No such campaign'
            });
        }
        return res.json(proposals);

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
                    campaignlId: req.body.campaignId,

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
            else {
                return res.status(405).send({ "message": "can't submit proposal,alread exists" });
            }


        })


    },

    /**
     * campaignController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        proposalModel.findOne({ _id: id }, function (err, proposal) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting campaign',
                    error: err
                });
            }
            if (!proposal) {
                return res.status(404).json({
                    message: 'No such campaign'
                });
            }
            proposal.proposal = req.body.proposal,
                proposal.cost = req.body.cost,
                proposal.dateOfSubmission = req.body.dateOfSubmission,
                proposal.channelId = req.body.channelId,
                proposal.campaignlId = req.body.campaignlId,

                proposal.save(function (err, proposal) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating campaign.',
                            error: err
                        });
                    }

                    return res.json(proposal);
                });
        });
    },

    /**
     * proposalController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        proposalModel.findByIdAndRemove(id, function (err, proposal) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the campaign.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },
};
