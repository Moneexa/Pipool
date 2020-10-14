const express = require('express');
const reportRoues= require('./reportsChannelController');
const router = express.Router({ mergeParams: true });


router.post('/reports', reportRoues.postReports);
module.exports = router;
