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
async function signup(req, res) {
console.log(req.body);
    if (req.body.obj.email) {
        const user = new UsertModel(
            {
                email: req.body.obj.email,
                name: req.body.obj.name,
                //password: req.body.password,
               // role: req.body.role,
            }
        );
     const resp= await user.save();

           resp .exec(function (err, user) {

                jwt.sign({
                    "id": user._id,
                    "role": user.role
                }, config.privateKey, {
                    expiresIn: '1d'
                }, function (err, token) {
                    if (err) {
                        console.log(err);

                        return res.sendStatus(500);
                    }
                    res.json({
                        "token": token,
                        "id": user._id
                    });
                });
            });
    }
    else {
        res.sendStatus(400);
    }
}
