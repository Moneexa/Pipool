const UsertModel = require('./user.model.js');
const config = require('../config.json');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const axios = require('axios');
var querystring = require('querystring');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.smtp.email,
        pass: config.smtp.password
    }
});



module.exports = {
    signup,
};

function signToken(id, callback) {
    let payload = {
        id
    };
    jwt.sign(
        payload,
        config.privateKey,
        {
            expiresIn: '1d'
        },
        callback
    );
}

function signup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const user = new UsertModel(
        {
            email: req.body.email,
        }
    );
    user.save((err) => {
        if (err) {
            console.error(err);
            return res.status(422).send("User already exists");
        }
        else {
            //console.log(user)
            signToken(user.id, function (err, token) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                var mailOptions = {
                    from: config.smtp.email,
                    to: user.email,
                    subject: 'Confirm Your Email',
                    text: `Confirm your email by clicking on following\n${config.domain}/auth/complete-signup?token=${token}&email=${user.email}`
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        res.status(500).send("Something went wrong while sending email");
                    } else {
                        res.status(201).send();
                    }
                });
            });
        }
    })
}
