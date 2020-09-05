var express = require('express');
var router = express.Router();
var influencerProposalController = require('./influencerProposalController');
var auth = require('../auth/auth');

/*
 * GET
 */
router.get('/:campaignId', auth.verify, influencerProposalController.show);
/*
 * POST
 */
router.post('/', auth.verify, influencerProposalController.create);

module.exports = router;
