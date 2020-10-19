var adsModel = require('../../common/ads-request/adsRequestModel');

module.exports = {
    list: async function (req, res) {
        try {
            const adsRequests = await adsModel.find().populate('campaign brand');
            if (!adsRequests) {
                return res.status(200).json([]);

            }
            console.log(adsRequests)
            return res.json(adsRequests)
        } catch (error) {
            res.status(500).send("Something went wrong while fetching ads requests")
        }
    }
};
