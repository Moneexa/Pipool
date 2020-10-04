const config = require('../config.json');
var offerModel = require('./offer.model');
var channelModel = require('../channel/channelModel')
const checkoutSDK = require('@paypal/checkout-server-sdk');
const payPalClient = require('../common/paypal-client/paypal-client');

module.exports = {
    create,
    update,
    list,
    show,
    verifyPayment

}

function create(req, res) {
    try {

        var offer = new offerModel({
            campaignId: req.body.campaignId,
            brandId: req.body.brandId,
            channelId: req.body.channelId,
            proposal: req.body.proposal,
            acceptanceStatus: "pending",
            price: req.body.price,
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
    offer.price = req.body.price ? req.body.price : offer.price;


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
        .find({ createdBy: res.locals.user.id, paymentVerified: false })
        .populate('campaignId proposal')
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
        channelNames = channel.map(value => {
            return value._id
        })

        console.log(channelNames)
        const offer = await offerModel.find({
            'channelId': {
                '$in': channelNames
            }, acceptanceStatus: "pending"
        }).populate('proposal campaignId')
        if (!offer) {
            return res.status(500).json({
                message: 'Error when getting offer.',
                error: err
            });
        }
        console.log(offer)
        return res.json(offer);
    } catch (error) {
        res.status(500).send("no channel offer found")
    }

}


async function verifyPayment(req, res) {
    const offerId = req.body.offerId;
    let price = 0;
    try {
        const offer = await offerModel.findById(offerId);
        if (!offer || !offer.price) return res.status(400).send("Offer not found");
        price = offer.price;
    } catch (error) {
        res.status(500).send("Something went wrong with the server");
    }

    // 2a. Get the order ID from the request body
    const orderId = req.body.orderId;

    // 3. Call PayPal to get the transaction details
    let request = new checkoutSDK.orders.OrdersGetRequest(orderId);

    let order;
    try {
        order = await payPalClient.client().execute(request);
    } catch (err) {

        // 4. Handle any errors from the call
        console.error(err);
        return res.send(500);
    }

    // 5. Validate the transaction details are as expected
    if (parseFloat(order.result.purchase_units[0].amount.value) !== parseFloat(price)) {
        return res.send(400).send("The price for the offer is different from the paid price");
    }

    // 6. Save the transaction in your database
    try {
        await offerModel.updateOne({ _id: offerId, paymentVerified: true });
    } catch (error) {
        return res.status(500).send("Something went wrong when tried to save the data");
    }

    // 7. Return a successful response to the client
    return res.send(200);
}