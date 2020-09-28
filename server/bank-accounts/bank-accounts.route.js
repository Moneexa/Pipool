var express = require('express');
var router = express.Router();
var bankAccountsController = require('./bank-accounts.controller');
var auth= require('../auth/auth');
/*
 * POST
 */
router.post('/', auth.verify, bankAccountsController.create);

module.exports = router;
