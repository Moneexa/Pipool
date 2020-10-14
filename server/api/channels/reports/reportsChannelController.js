var reportsModel = require('../../common/reports/reportsModel');
var channelModel = require('../channelsModel');

/**
 * campaignController.js
 *
 * @description :: Server-side logic for managing campaigns.
 */
module.exports = {

    postReports: async function (req, res) {
        
        var report = new reportsModel({
            message: req.body.message,
            author: req.params.channelId,
            dateOfSubmission: new Date(),
            campaign: req.params.campaignId,
            

        });

        report.save(function (err, report) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating report',
                    error: err
                });
            }
            return res.status(201).json(report);
        });
    },
}
