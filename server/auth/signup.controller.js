const UsertModel = require('./user.model.js');
const config = require('../config.json');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const axios = require('axios');
var querystring = require('querystring');
var nodemailer = require('nodemailer');
const crypto = require('crypto')

var transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
        user: config.smtp.email,
        pass: config.smtp.password
    }
});



module.exports = {
    signup,
    finishSignup
};

function signToken(id, email, name, role, picture, callback) {
    let payload = {
        id
    };
    if (name) { payload.name = name }
    if (role) { payload.role = role }
    if (picture) { payload.name = picture }
    if (email) { payload.email = email }
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
    const id = new mongoose.Types.ObjectId();
    const email = req.body.email;
    console.log(email);

    signToken(id, email, undefined, undefined, undefined, function (err, token) {
        // console.log(id);
        // console.log(token)
        /* if (err) {
             console.log(err);
             return res.sendStatus(200);
         }*/
        var mailOptions = {
            from: config.smtp.email,
            to: email,
            subject: 'Confirm Your Email',
            text: `Confirm your email by clicking on following ${config.domain}/auth/finish-signup?token=${token}&email=${email}`
        };
        //console.log(mailOptions);
        transporter.sendMail(mailOptions, function (error, info) {
            console.log(info)
            /*if (error) {
                console.log(error);
                res.status(500).send("Something went wrong while sending email");
            } else {*/
            res.status(201).send();
            // }
        });
    });
}

function finishSignup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const fullName = req.body.firstName + ' ' + req.body.lastName;
    const phone = req.body.phone;
    const company = req.body.company;
    const designation = req.body.designation;
    const role = req.body.role;
    const id = res.locals.user.id;
    const email = res.locals.user.email;
    //bcrypt.hash(req.body.password, 8)
    // .then((password) => {
    crypto.pbkdf2(req.body.password, 'salt', 100, 64, 'sha512', async (err, password) => {

        password = password.toString('hex');

        const user = await UsertModel.updateOne(
            { _id: id },
            {
                fullName,
                phone,
                company,
                designation,
                password,
                role
            },
            {
                upsert: true
            }
        );

        try {
            signToken(
                id,
                undefined,
                fullName,
                role,
                undefined,
                (error, token) => {
                    if (error) {
                        res.status(500).send("Unable to sign jwt");
                    }

                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    const obj = {
                        "id": id,
                        "fullName": fullName || "",
                        "role": role || "",
                        "token": {
                            "value": token,
                            "expiry": tomorrow
                        }
                    }
                    res.status(200).send(obj)
                }
            )
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Something went wrong");
        };
    })
}
