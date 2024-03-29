var express = require('express');
var router = express.Router({ mergeParams: true });
var proposalController = require('./brandProposalController.js');
var auth = require('../../../auth/auth');
//const { verify } = require('jsonwebtoken');

/*
 * GET
 */
router.get('/', auth.verify, proposalController.list);

/*
 * GET
 */
router.get('/:campaignId', auth.verify, proposalController.show);

/*
 * POST
 */
router.post('/', auth.verify, proposalController.create);

/*
 * PUT
 */
router.put('/:id', auth.verify, proposalController.update);

/*
 * DELETE
 */
router.delete('/:id', auth.verify, proposalController.remove);
module.exports = router;
