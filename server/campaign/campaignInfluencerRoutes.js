var express = require('express');
var router = express.Router();
var campaignController = require('./campaignInfluencerController.js');
var auth = require('../auth/auth');


router.get('/:channelId/campaigns/', auth.verify, campaignController.suggestedCampaigns);
router.get('/:channelId/campaigns/active', auth.verify, campaignController.active);
router.get('/:channelId/campaigns/:campaignId', auth.verify, campaignController.show);
module.exports = router;
