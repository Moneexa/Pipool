var express = require('express');
var router = express.Router();
var controller = require('./offer.controller');
var auth= require('../auth/auth');
/*
 * POST
 */
router.post('/create', auth.verify, controller.create);
router.get('/to-be-payed', auth.verify, controller.list);
router.post('/verify-payment', auth.verify, controller.verifyPayment)
router.get('/', auth.verify, controller.show);
router.put('/', auth.verify, controller.update);

module.exports = router;
