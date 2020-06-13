const express = require('express');
const router = express.Router();
const { check } = require('express-validator');


// Require the controllers WHICH WE DID NOT CREATE YET!!
const loginController = require('./login.controller');
const signupController = require('./signup.controller');

// a simple test url to check that all of our files are communicating correctly.
router.post('/login', loginController.login);
router.post('/login/google', [
    check('code').isString()
], loginController.loginGoogle);
router.post('/login/facebook', [check('code').isString()],loginController.loginFacebook)
router.post('/login/linkedin', [check('code').isString()], loginController.loginLinkedin)
router.post('/signup', signupController.signup);
module.exports = router;