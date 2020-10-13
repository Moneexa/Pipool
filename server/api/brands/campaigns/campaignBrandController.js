var campaignModel = require('../../common/campaigns/campaignsModel');
var offerModel = require('../../common/offers/offer.model');
var bankAccountModel = require('../../common/bank-accounts/bank-accounts.model')
var channelModel = require('../../channels/channelsModel')
var proposalModel = require('../../common/proposals/proposalsModel')
var paypal = require('paypal-rest-sdk');
const config = require('../../../config.json');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': config.paypal.sandbox.clientId,
    'client_secret': config.paypal.sandbox.clientSecret
});

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

    campaignProposals: async function (req, res) {
        var brandId = req.params.brandId;
        var id = req.params.id;
        console.log(id)
        const proposals = await proposalModel.find({ campaignId: id }).populate({ path: 'channelId' });
        console.log(proposals)

        if (!proposals) {
            res.status(404).json({
                message: 'No such campaign'
            });
        }
        return res.json(proposals);
    },

    suggestedInfluencers: async function (req, res) {
        try {
            var id = req.params.id
            console.log(req.body);
            let campaign = await campaignModel.findOne({ _id: id })
            if (!campaign) {
                return res.status(404).send('Campaign not found')
            }
            const suggestedChannels = await channelModel.find({
                'category': {
                    '$in': campaign.interests
                },
                'followers': {
                    '$gt': campaign.minFollowers
                },

            })
            if (suggestedChannels) { console.log(suggestedChannels) }

            res.status(200).send(suggestedChannels)




        }
        catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

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
            brand: req.params.brandId,
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
    list: async function (req, res) {
        try {
            const campaigns = await campaignModel.find({ brand: req.params.brandId })
            if (campaigns) { console.log(campaigns) }

            res.status(200).send(campaigns)

        }
        catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    activeCampaigns: async function (req, res) {
        try {
            const offers = await offerModel.find({
                brandId: req.params.brandId,
                paymentVerified: true,
                paymentReleased: false
            })
                .populate('campaignId')
            res.status(200).send(offers);
        } catch (error) {
            res.status(500).send("Something went wrong")
        }
    },
    releasePayment: async function (req, res) {
        try {
            const brandId = req.params.brandId;
            const campaignId = req.params.id;

            let offer = await offerModel.findOne({
                brandId,
                campaignId
            }).populate('channelId');

            if (!offer) return res.status(400).send("No offer found with this campaign");

            const bankAccount = await bankAccountModel.findOne({
                createdBy: offer.channelId.createdBy
            });

            if (!bankAccount) return res.status(400).send("Influencer don't have bank account setup");

            var sender_batch_id = Math.random().toString(36).substring(9);
            var create_payout_json = {
                "sender_batch_header": {
                    "sender_batch_id": sender_batch_id,
                    "email_subject": "You have a payment"
                },
                "items": [
                    {
                        "recipient_type": 'PAYPAL_ID',
                        "amount": {
                            "value": (offer.price * 0.9),
                            "currency": "USD"
                        },
                        "receiver": bankAccount.paypalId,
                        "note": "POSPYO001",
                        "sender_item_id": "item_3"
                    }
                ]
            };

            var sync_mode = 'false';

            paypal.payout.create(create_payout_json, sync_mode, async (error, payout) => {
                if (error) {
                    console.log(error.response);
                    res.status(500).send("Something went wrong while processing payment");
                } else {
                    console.log("Create Single Payout Response");
                    console.log(payout);
                    offer.paymentReleased = true;
                    try {
                        await offer.save();
                        res.status(200).send("Payment released successfully")
                    } catch (error) {
                        res.status(500).send("Something went wrong with saving data")
                    }
                }
            });

        } catch (error) {
            res.status(500).send('Something went wrong while processing payment')
        }
    },
};
