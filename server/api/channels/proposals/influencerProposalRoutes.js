var express = require('express');
var router = express.Router({ mergeParams: true });
var influencerProposalController = require('./influencerProposalController');
var auth = require('../../../auth/auth');

/*
 * GET
 */
router.get('/:campaignId', auth.verify, influencerProposalController.show);

module.exports = router;
