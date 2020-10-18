var express = require('express');
var router = express.Router({ mergeParams: true });
var campaignController = require('./campaignAdminController');

/*
 * GET Suggested Influencers
 */
router.get('/:id/suggested-influencers',   campaignController.suggestedInfluencers)
router.get('/:id/proposals',   campaignController.campaignProposals)

/*
 * GET
 */
router.get('/',   campaignController.list);

/*
 * Active campaigns
 */

router.get('/active',   campaignController.activeCampaigns);
router.get('/disputed',   campaignController.disputedCampaigns);
/*
 * GET
 */

router.get('/:id',   campaignController.show);

/*
 * POST
 */
router.post('/',   campaignController.create);
router.post('/:id/release-payment',   campaignController.releasePayment);

/*
 * PUT
 */
router.put('/:id',   campaignController.update);

/*
 * DELETE
 */
router.delete('/:id',   campaignController.remove);

module.exports = router;
