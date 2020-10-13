var express = require('express');
var router = express.Router({ mergeParams: true });
var campaignController = require('./campaignInfluencerController.js');
var auth = require('../../../auth/auth');


router.get('/', auth.verify, campaignController.suggestedCampaigns);
router.get('/active', auth.verify, campaignController.active);
router.get('/:campaignId', auth.verify, campaignController.show);
router.get('/:campaignId/proposals', auth.verify, campaignController.getProposal);
router.post('/:campaignId/proposals', auth.verify, campaignController.postProposal);
module.exports = router;
