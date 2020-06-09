const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const login_controller = require('../auth/login.controller');


// a simple test url to check that all of our files are communicating correctly.
router.post('/login', login_controller.post);
router.post('/login/google', login_controller._post);
module.exports = router;