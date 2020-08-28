var campaignModel = require('./campaignModel.js');
var channelModel = require('../channel/channelModel.js');


/**
 * campaignController.js
 *
 * @description :: Server-side logic for managing campaigns.
 */
module.exports = {

    /**
     * campaignController.list()
     */
    list: function (req, res) {
        campaignModel.find({ createdBy: res.locals.user.id }, function (err, campaigns) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting campaign.',
                    error: err
                });
            }
            return res.json(campaigns);
        });
    },

    /**
     * campaignController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        campaignModel.findOne({ _id: id }, function (err, campaign) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting campaign.',
                    error: err
                });
            }
            if (!campaign) {
                return res.status(404).json({
                    message: 'No such campaign'
                });
            }
            return res.json(campaign);
        });
    },

    /**
     * campaignController.create()
     */
    create: function (req, res) {

        var campaign = new campaignModel({
            serviceName: req.body.serviceName,
            serviceDescription: req.body.serviceDescription,
            category: req.body.category,
            coverImage: req.body.coverImage,
            callForAction: req.body.callForAction,
            briefInfluencers: req.body.briefInfluencers,
            do: req.body.do,
            dont: req.body.dont,
            caption: req.body.caption,
            productNeed: req.body.productNeed,
            gender: req.body.gender,
            location: req.body.location,
            age: req.body.age,
            minFollowers: req.body.minFollowers,
            postingLanguages: req.body.postingLanguages,
            interests: req.body.interests,
            createdBy: res.locals.user.id


        });

        campaign.save(function (err, campaign) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating campaign',
                    error: err
                });
            }
            return res.status(201).json(campaign);
        });
    },

    /**
     * campaignController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        campaignModel.findOne({ _id: id }, function (err, campaign) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting campaign',
                    error: err
                });
            }
            if (!campaign) {
                return res.status(404).json({
                    message: 'No such campaign'
                });
            }

            campaign.serviceName = req.body.serviceName ? req.body.serviceName : campaign.serviceName;
            campaign.serviceDescription = req.body.serviceDescription ? req.body.serviceDescription : campaign.serviceDescription;
            campaign.category = req.body.category ? req.body.category : campaign.category;
            campaign.coverImage = req.body.coverImage ? req.body.coverImage : campaign.coverImage;
            campaign.callForAction = req.body.callForAction ? req.body.callForAction : campaign.callForAction;
            campaign.briefInfluencers = req.body.briefInfluencers ? req.body.briefInfluencers : campaign.briefInfluencers;
            campaign.do = req.body.do ? req.body.do : campaign.do;
            campaign.dont = req.body.dont ? req.body.dont : campaign.dont;
            campaign.caption = req.body.caption ? req.body.caption : campaign.caption;
            campaign.productNeed = req.body.productNeed ? req.body.productNeed : campaign.productNeed;
            campaign.gender = req.body.gender ? req.body.gender : campaign.gender;
            campaign.location = req.body.location ? req.body.location : campaign.location;
            campaign.age = req.body.age ? req.body.age : campaign.age;
            campaign.minFollowers = req.body.minFollowers ? req.body.minFollowers : campaign.minFollowers;
            campaign.postingLanguages = req.body.postingLanguages ? req.body.postingLanguages : campaign.postingLanguages;
            campaign.interests = req.body.interests ? req.body.interests : campaign.interests;

            campaign.save(function (err, campaign) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating campaign.',
                        error: err
                    });
                }

                return res.json(campaign);
            });
        });
    },

    /**
     * campaignController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        campaignModel.findByIdAndRemove(id, function (err, campaign) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the campaign.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },
    suggestedCampaigns: async function (req, res) {
        try {
            var category = await channelModel.find({ createdBy: res.locals.user.id })
            if (!category) {
                return res.status(404).send("not found")
            }
            // console.log(category)
            category = category.map(value => {
                return (value.category)
            })
            console.log(category)
            const suggestedCampaigns = await campaignModel.find({"interests":{$all:category}})
    // const suggestedCampaigns = await campaignModel.find({interests:category.category})
    if(suggestedCampaigns) { console.log(suggestedCampaigns) }

            res.status(200).send(suggestedCampaigns)

}
        catch (error) {
    console.log(error)
    res.status(500).send(error)
}




    }
};
