
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const signupController = require('./signup.controller');
router.post('/', [check('email').isEmail()], signupController.signup);


module.exports = router;
