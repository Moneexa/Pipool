var express = require('express');
var router = express.Router({ mergeParams: true });
var controller = require('./offer.controller');
var auth= require('../../../auth/auth');



router.get('/', auth.verify, controller.list);
router.put('/:offerId', auth.verify, controller.update);

module.exports = router;
