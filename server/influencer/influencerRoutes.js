var express = require('express');
var router = express.Router();
var influencerController = require('./influencerController.js');

/*
 * GET
 */
router.get('/', influencerController.list);

/*
 * GET
 */
router.get('/:id', influencerController.show);

/*
 * POST
 */
router.post('/', influencerController.create);

/*
 * PUT
 */
router.put('/:id', influencerController.update);

/*
 * DELETE
 */
router.delete('/:id', influencerController.remove);
router.post('/twitter/oauth/request_token',influencerController.twitterOAuth),
router.post('/twitter/oauth/', influencerController.twitterPostOAuth);
router.post('/youtube/oauth/', influencerController.youtubeOAuth);
module.exports = router;
