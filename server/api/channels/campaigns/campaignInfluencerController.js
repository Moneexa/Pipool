var campaignModel = require('../../common/campaigns/campaignsModel');
var offerModel = require('../../common/offers/offer.model')
const ProposalModel = require('../../common/proposals/proposalsModel')

/**
 * campaignController.js
 *
 * @description :: Server-side logic for managing campaigns.
 */
module.exports = {

    show: async function (req, res) {
        const id = req.params.campaignId
        var campaign = await campaignModel.findOne({ _id: id });
        if (!campaign) {
            return res.status(404).send("nothing found")
        }

        return res.status(200).send(campaign)
    },
    postProposal: function (req, res) {
        ProposalModel.findOne({ channelId: req.params.channelId, campaignId: req.params.campaignId }, function (err, proposal) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting such proposal.',
                    error: err
                });
            }
            if (!proposal) {
                var proposal = new ProposalModel({
                    proposal: req.body.proposal,
                    cost: req.body.cost,
                    dateOfSubmission: req.body.dateOfSubmission,
                    // channelId: req.body.channelId,
                    campaignId: req.body.campaignId,
                    channelId: req.body.channelId,
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

    getProposal: async function (req, res) {
        const channelId = req.params.channelId
        const campaignId = req.params.campaignId
        try {
            const proposal = await ProposalModel.findOne({
                campaignId,
                channelId,
            });
            if (!proposal) {
                return res.status(404).send("nothing found")
            }

            return res.status(200).send(proposal)
        } catch (error) {
            return res.status(500).send('Something went wrong')
        }

    },
    suggestedCampaigns: async function (req, res) {
        try {
            // var category = await channelModel.find({ createdBy: res.locals.user.id })
            // if (!category) {
            //     return res.status(404).send("not found")
            // }
            // // console.log(category)
            // category = category.map(value => {
            //     return (value.category)
            // })
            // console.log(category)
            const suggestedCampaigns = await campaignModel.find()
            // const suggestedCampaigns = await campaignModel.find({interests:category.category})
            if (suggestedCampaigns) { console.log(suggestedCampaigns) }

            res.status(200).send(suggestedCampaigns)

        }
        catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    active: async function (req, res) {
        try {
            const offers = await offerModel.find({
                channelId: req.params.channelId,
                paymentVerified: true,
                paymentReleased: false
            })
                .populate('campaignId')
            res.status(200).send(offers);
        } catch (error) {
            res.status(500).send("Something went wrong")
        }


    }
}