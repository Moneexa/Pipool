const express = require('express');
const router = express.Router();
const { check } = require('express-validator');


// Require the controllers WHICH WE DID NOT CREATE YET!!
const loginController = require('./login.controller');

// a simple test url to check that all of our files are communicating correctly.
router.post('/', loginController.login);
router.post('/google', [
    check('code').isString()
], loginController.loginGoogle);
router.post('/facebook', [check('code').isString()],loginController.loginFacebook)
router.post('/linkedin', [check('code').isString()], loginController.loginLinkedin)


module.exports = router;