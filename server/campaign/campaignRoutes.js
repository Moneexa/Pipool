var express = require('express');
var router = express.Router();
var campaignController = require('./campaignController.js');
const campaignInfluencerController = require('./campaignInfluencerController');
var auth = require('../auth/auth');
//const { verify } = require('jsonwebtoken');

/*
 * GET
 */
//router.get('/', auth.verify, campaignController.list);

/*
 * GET
 */
router.get('/:id', auth.verify, campaignController.show);

/*
 * POST
 */
router.post('/', auth.verify, campaignController.create);

/*
 * PUT
 */
router.put('/:id', auth.verify, campaignController.update);

/*
 * DELETE
 */
router.delete('/:id', auth.verify, campaignController.remove);
router.get('/', auth.verify, campaignController.suggestedCampaigns);
router.get('/:channelId/campaigns/active/', auth.verify, campaignInfluencerController.active)
module.exports = router;
