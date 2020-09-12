var campaignModel = require('./campaignModel.js');
var userModel = require('../auth/user.model');
var brandModel = require('../brand/brandController');

/**
 * campaignController.js
 *
 * @description :: Server-side logic for managing campaigns.
 */
module.exports = {

    /**
     * campaignController.list()
     */
    show: async function (req, res) {
        id = req.params.campaignId
        var campaign = await campaignModel.findOne({ _id: id });
        if (!campaign) {
            return res.status(404).send("nothing found")
        }


        console.log(campaign.createdBy)
        var brandId = campaign.createdBy

        userModel.findOne({ _id: brandId }, function (err, user) {
            if (err) {
                return res.status(404).send("no such brand")

            }
            console.log(user)
            return res.json(user)
        })


    },
}