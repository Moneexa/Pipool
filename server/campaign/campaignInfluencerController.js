var campaignModel = require('./campaignModel.js');
var offerModel = require('../offer/offer.model')
var userModel = require('../auth/user.model');
var brandModel = require('../brand/brandController');

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