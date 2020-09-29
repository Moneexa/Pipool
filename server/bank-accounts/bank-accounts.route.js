var express = require('express');
var router = express.Router();
var bankAccountsController = require('./bank-accounts.controller');
var auth= require('../auth/auth');


router.post('/', auth.verify, bankAccountsController.create);
router.get('/', auth.verify, bankAccountsController.show);

module.exports = router;
