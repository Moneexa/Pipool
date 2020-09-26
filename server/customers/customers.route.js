var express = require('express');
var router = express.Router();
var controller = require('./customers.controller');
var auth= require('../auth/auth');
/*
 * POST
 */
router.post('/session', auth.verify, controller.create);
router.get('/verify-session', controller.verifySession);
router.get('/verify-payment-setup/', controller.verifySetup);

module.exports = router;
