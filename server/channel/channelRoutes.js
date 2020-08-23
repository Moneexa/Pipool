var express = require('express');
var router = express.Router();
var channelController = require('./channelController.js');
var auth = require('../auth/auth')

/*
 * GET
 */
//router.get('/:id', auth.verify, channelController.list);
router.get ('/:id/suggested-influencers', auth.verify, channelController.suggestedInfluencers)

/*
 * GET
 */
router.get('/', auth.verify, channelController.show);

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
router.post('/twitter/oauth/request_token', auth.verify, channelController.twitterOAuth);
router.post('/twitter/oauth/', auth.verify, channelController.twitterPostOAuth);
router.post('/youtube/oauth/', auth.verify, channelController.youtubeOAuth);
router.post('/instagram/oauth/', auth.verify, channelController.InstaOAuth)
router.post('/facebook/oauth/', auth.verify, channelController.FacebookOAuth)

router.post('/tiktok/oauth/', auth.verify, channelController.TiktokPostOauth)
module.exports = router;
