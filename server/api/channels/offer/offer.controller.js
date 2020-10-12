var offerModel = require('../../common/offers/offer.model');


module.exports = {
    update,
    list,
}


async function update(req, res) {
    var offerId = req.params.offerId;
    var channelId = req.params.channelId;
    var offer = await offerModel.findOne({ channelId: channelId, _id: offerId })

    if (!offer) {
        return res.status(404).json({
            message: 'No such offer'
        });
    }
    offer.acceptanceStatus = req.body.acceptanceStatus ? req.body.acceptanceStatus : offer.acceptanceStatus;

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

    const offer = await offerModel
        .find({ channelId: req.params.channelId })
        .populate('campaignId proposal')
    if (!offer) {
        return res.status(404).json({
            message: 'No offer found.',
            error: err
        });
    }
    console.log(offer)

    return res.json(offer);

}

