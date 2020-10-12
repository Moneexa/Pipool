var express = require('express');
var router = express.Router({ mergeParams: true });
var channelController = require('./insightsController.js');
var auth = require('../../../auth/auth')

/*
 * GET
 */
router.get('/', auth.verify, channelController.get);

/*
 * POST
 */
router.post('/', auth.verify, channelController.create);

/*
 * PUT
 */
router.put('/', auth.verify, channelController.update);

/*
 * DELETE
 */
router.delete('/', channelController.remove);

router.post('/instagram/', auth.verify, channelController.InstaInsights)
router.post('/facebook/', auth.verify, channelController.FaecbookInsights)
router.post('/tiktok/', auth.verify, channelController.TiktokInsights)
router.post('/youtube/' , auth.verify , channelController.YoutubeInsights)

module.exports = router;
