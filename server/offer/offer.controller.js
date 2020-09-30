const config = require('../config.json');
var offerModel = require('./offer.model');
var channelModel = require('../channel/channelModel')

module.exports = {
    create,
    update,
    list,
    show

}


function create(req, res) {
    try {

        var offer = new offerModel({
            campaignId: req.body.campaignId,
            brandId: req.body.brandId,
            channelId: req.body.channelId,
            proposal: req.body.proposal,
            acceptanceStatus: "pending",
            createdBy: res.locals.user.id

        })
        offer.save(function (err, offer) {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Error when creating offer',
                    error: err
                });
            }
            return res.status(201).json(offer);
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send('Unable to send offer');
    }


}

async function update(req, res) {
    var offerId = req.body.offerId;
    var offer = await offerModel.findOne({ _id: offerId })

    if (!offer) {
        return res.status(404).json({
            message: 'No such offer'
        });
    }

    offer.campaignId = req.body.campaignId ? req.body.campaignId : offer.campaignId;
    offer.channelId = req.body.channelId ? req.body.channelId : offer.channelId;
    offer.brandId = req.body.brandId ? req.body.brandId : offer.brandId;
    offer.acceptanceStatus = req.body.acceptanceStatus ? req.body.acceptanceStatus : offer.acceptanceStatus;
    offer.proposal = req.body.proposal ? req.body.proposal : offer.proposal;


    offer.save(function (err, offer) {
        if (err) {
            return res.status(500).json({
                message: 'Error when updating offer.',
                error: err
            });
        }

        return res.json(offer);
    });

}
async function list(req, res) {

    const offer = await offerModel.find({ createdBy: res.locals.user.id, acceptanceStatus: "accept" })
    if (!offer) {
        return res.status(500).json({
            message: 'Error when getting offer.',
            error: err
        });
    }
    console.log(offer)

    return res.json(offer);

}
async function show(req, res) {
    try {

        //var channelNames = []

        const channel = await channelModel.find({
            createdBy: res.locals.user.id
        })
        if (!channel) {
            res.status(500).send("no channel offer found")
        }
        channelNames=channel.map(value=>{
           return value._id
        })

        console.log(channelNames)
        const offer = await offerModel.find({
            'channelId': {
                '$in': channelNames
            }, acceptanceStatus: "pending"
        })
        if (!offer) {
            return res.status(500).json({
                message: 'Error when getting offer.',
                error: err
            });
        }
        console.log(offer)
        return res.json(offer);
    } catch (error) {
        console.log(error)
    }

}
