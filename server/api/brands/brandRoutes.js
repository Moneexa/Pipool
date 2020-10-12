const express = require('express');
const router = express.Router({ mergeParams: true });
const brandController = require('./brandController.js');
const campaignsRoutes = require('./campaigns/campaignBrandRoutes')
const offersRoutes = require('./offer/offer.route');
const proposalsRoutes = require('./proposals/brandProposalRoutes');
const auth = require('../../auth/auth')

/*
 * GET
 */
router.get('/', auth.verify, brandController.list);

/*
 * GET
 */
router.get('/:id', auth.verify, brandController.show);

/*
 * POST
 */
router.post('/', auth.verify, brandController.create);

/*
 * PUT
 */
router.put('/:id', auth.verify, brandController.update);

/*
 * DELETE
 */
router.delete('/:id', brandController.remove);


router.use('/:brandId/campaigns', campaignsRoutes)
router.use('/:brandId/offers', offersRoutes)
router.use('/:brandId/proposals', proposalsRoutes)


module.exports = router;
