var express = require('express');
var router = express.Router({ mergeParams: true });
var reportAdminController = require('./reportsAdminController');

router.get('/',   reportAdminController.show);
module.exports = router;
