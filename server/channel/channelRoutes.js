var express = require('express');
var router = express.Router();
var channelController = require('./channelController.js');

/*
 * GET
 */
router.get('/', channelController.list);

/*
 * GET
 */
router.get('/:id', channelController.show);

/*
 * POST
 */
router.post('/', channelController.create);

/*
 * PUT
 */
router.put('/:id', channelController.update);

/*
 * DELETE
 */
router.delete('/:id', channelController.remove);
router.post('/twitter/oauth/request_token',channelController.twitterOAuth),
router.post('/twitter/oauth/', channelController.twitterPostOAuth);
router.post('/youtube/oauth/', channelController.youtubeOAuth);
router.post('/instagram/oauth/', channelController.InstaPostOAuth)
module.exports = router;
