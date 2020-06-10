const express = require('express');
const router = express.Router();
const { check } = require('express-validator');


// Require the controllers WHICH WE DID NOT CREATE YET!!
const loginController = require('./login.controller');


// a simple test url to check that all of our files are communicating correctly.
router.post('/login', loginController.login);
router.post('/login/google', [
    check('code').isString()
], loginController.loginGoogle);
router.get('/login/facebook', [check('code').isString()],loginController.loginFacebook)
module.exports = router;