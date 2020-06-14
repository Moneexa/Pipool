const UsertModel = require('./user.model.js');
const config = require('../config.json');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const axios = require('axios');
var querystring = require('querystring');
module.exports = {
    signup,

};

async function createAndGetProfile(email, name, picture) {
    let user = await UsertModel.findOne({ "email": email }).exec();
    if (!user) {
        user = new UsertModel(
            {
                email,
                name,
                picture,
            }
        );
        await user.save();
    }
    return user;
}

function signToken(id, name, role, picture, callback) {
    let payload = {
        id
    };
    if (name) { payload.name = name }
    if (role) { payload.name = role }
    if (picture) { payload.name = picture }
    jwt.sign(
        payload,
        config.privateKey,
        {
            expiresIn: '1d'
        },
        callback
    );
}
const { create } = require('./user.model.js');
function signup(req, res, next) {
    console.log(req.body)
    if (req.body.email) {
        const _user = new UsertModel(
            {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                 role: req.body.role,
                 
            }
        );
        _user.save((err) => {
            if (err) {
                return next(err);

            }
            else {
                //console.log(user)
                jwt.sign({
                    "id": _user._id,
                    "role": _user.role,
                }, config.privateKey, {
                    expiresIn: '1d'
                }, function (err, token) {
                    if (err) {
                        console.log(err);

                        return res.sendStatus(500);
                    }
                    res.json({
                        "token": token,
                        "id": _user._id
                    });
                });
            }
        })

        //.catch(error => console.error(error.message))
    }
    else {
        res.sendStatus(400);
    }
}
