const express = require('express');
const channelController = require('./channelsController.js');
const router = express.Router({ mergeParams: true });
const campaignsRoutes = require('./campaigns/campaignInfluencerRoutes');
const insightsRoutes = require('./insights/insightsRouter');
const offersRoutes = require('./offer/offer.route');
const proposalsRoutes = require('./proposals/influencerProposalRoutes');
const auth = require('../../auth/auth')
const reports = require('./reports/reportsChannelRoutes');

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

router.use('/:channelId/campaigns', campaignsRoutes)
router.use('/:channelId/insights', insightsRoutes)
router.use('/:channelId/offers', offersRoutes)
router.use('/:channelId/proposals', proposalsRoutes)
router.use('/:channelId/:campaignId', reports);




module.exports = router;
