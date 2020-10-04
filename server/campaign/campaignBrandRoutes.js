var express = require('express');
var router = express.Router({ mergeParams: true });
var campaignController = require('./campaignBrandController.js');
var auth = require('../auth/auth');
//const { verify } = require('jsonwebtoken');

/*
 * GET
 */
router.get('/', auth.verify, campaignController.list);

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

/*
 * Active campaigns
 */

router.get('/active', auth.verify, campaignController.activeCampaigns);
module.exports = router;
