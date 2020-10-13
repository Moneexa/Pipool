var express = require('express');
var router = express.Router({ mergeParams: true });
var controller = require('./offer.controller');
var auth = require('../../../auth/auth');
/*
 * POST
 */
router.post('/', auth.verify, controller.create);
router.get('/unpaid', auth.verify, controller.list);
router.post('/:id/verify-payment', auth.verify, controller.verifyPayment)
router.get('/', auth.verify, controller.show);
router.put('/', auth.verify, controller.update);

module.exports = router;
