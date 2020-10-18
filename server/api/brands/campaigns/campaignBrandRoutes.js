var express = require('express');
var router = express.Router({ mergeParams: true });
var campaignController = require('./campaignBrandController.js');
var auth = require('../../../auth/auth');

/*
 * GET Suggested Influencers
 */
router.get('/:id/suggested-influencers', auth.verify, campaignController.suggestedInfluencers)
router.get('/:id/proposals', auth.verify, campaignController.campaignProposals)

/*
 * GET
 */
router.get('/', auth.verify, campaignController.list);

/*
 * Active campaigns
 */

router.get('/active', auth.verify, campaignController.activeCampaigns);

/*
 * GET
 */

router.get('/:id', auth.verify, campaignController.show);

/*
 * POST
 */
router.post('/', auth.verify, campaignController.create);
router.post('/:id/release-payment', auth.verify, campaignController.releasePayment);
router.post('/:id/request-ads', auth.verify, campaignController.requestAds);
router.post('/:id/report-dispute', auth.verify, campaignController.reportDispute);

/*
 * PUT
 */
router.put('/:id', auth.verify, campaignController.update);

/*
 * DELETE
 */
router.delete('/:id', auth.verify, campaignController.remove);

module.exports = router;
