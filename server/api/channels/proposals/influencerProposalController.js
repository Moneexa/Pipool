var proposalModel = require('../../common/proposals/proposalsModel');


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
        const proposal=await proposalModel.findOne({ campaignId: id, createdBy: res.locals.user.id }) 
            
            if (!proposal) {
                res.status(404).json({
                    message: 'No such campaign'
                });
            }
            return res.json(proposal);
        
    },
};
