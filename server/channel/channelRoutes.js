var express = require('express');
var router = express.Router();
var channelController = require('./channelController.js');
var auth= require('../auth/auth')

/*
 * GET
 */
router.get('/', auth.verify, channelController.list);

/*
 * GET
 */
router.get('/:id',auth.verify, channelController.show);

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
router.post('/twitter/oauth/request_token', auth.verify, channelController.twitterOAuth),
router.post('/twitter/oauth/',auth.verify,  channelController.twitterPostOAuth);
router.post('/youtube/oauth/',auth.verify, channelController.youtubeOAuth);
router.post('/instagram/oauth/', auth.verify, channelController.InstaPostOAuth)
module.exports = router;
