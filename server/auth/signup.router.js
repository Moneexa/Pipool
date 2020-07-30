const express = require('express');
const router = express.Router();
const { check, checkSchema } = require('express-validator');
const auth = require('./auth')


var roleSchema = {
    "role": {
        in: 'body',
        isIn: {
            options: [["admin", "brand", "influencer"]],
            errorMessage: "Invalid role"
        }
    }
}

const signupController = require('./signup.controller');
router.post(
    '/finish',
    auth.verify,
    [
        check('password').isString(),
        check('firstName').isString(),
        check('lastName').isString(),
        check('phone').isString(),
        check('company').isString(),
        check('designation').isString(),
        checkSchema(roleSchema),
    ],
    signupController.finishSignup
);
router.post('/', [check('email').isEmail()], signupController.signup);

module.exports = router;
