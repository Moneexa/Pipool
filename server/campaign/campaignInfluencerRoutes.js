var express = require('express');
var router = express.Router();
var campaignController = require('./campaignInfluencerController.js');
var auth = require('../auth/auth');


router.get('/:campaignId', auth.verify, campaignController.show);
module.exports = router;
