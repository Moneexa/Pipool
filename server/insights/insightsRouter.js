var express = require('express');
var router = express.Router();
var channelController = require('./insightsController.js');
var auth = require('../auth/auth')

/*
 * GET
 */
router.get('/:channelId/:channelName', auth.verify, channelController.list);

/*
 * GET
 */
router.get('/:id', auth.verify, channelController.show);

/*
 * POST
 */
router.post('/', auth.verify, channelController.create);

/*
 * PUT
 */
router.put('/:id', auth.verify, channelController.update);

/*
 * DELETE
 */
router.delete('/:id', channelController.remove);

router.post('/instagram/', auth.verify, channelController.InstaInsights)
router.post('/facebook/', auth.verify, channelController.FaecbookInsights)
router.post('/tiktok/', auth.verify, channelController.TiktokInsights)
router.post('/youtube/' , auth.verify , channelController.YoutubeInsights)

module.exports = router;
