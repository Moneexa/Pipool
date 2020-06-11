const UsertModel = require('./user.model.js');
const config = require('../config.json');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const axios = require('axios');

module.exports = {
	login,
	loginFacebook,
	loginGoogle,
	verify
};

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("529379787978-sgjjt3qpl23ivkp2boh1s3q03m3k5a8n.apps.googleusercontent.com");
async function login(req, res) {

	if (req.body.email && req.body.password) {
		UsertModel.findOne({
			"email": req.body.email,
		}).exec(function (err, user) {
			if (err || !user) {
				return res.sendStatus(400);
			} else {
				bcrypt.compare(req.body.password, user.password, function (err, passed) {
					if (err || !passed) {
						return res.sendStatus(500);
					}
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
		});

	} else {
		res.sendStatus(400);
	}
}


//async 
function loginFacebook(req, res) {
	try {
		const url = encodeURI(`https://graph.facebook.com/v7.0/me?access_token=${req.body.code}&fields=email,name&format=json&method=get&pretty=0&transfer=cors`)
		//const resp = await axios.get(url);
		//console.log(resp);
		axios.get(url).then((res)=>res.json()).
		then((res)=>{
			console.log(res);
			res.status(200).send(res.data);

		}).catch(res.status(422).send("You have sent an incorrect token"))
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Not Working");
	}
}
async function loginGoogle(req, res) {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const code = req.body.code;

	try {
		const ticket = await client.verifyIdToken({
			idToken: code,
			audience: config.google.clientId,
		});
		const payload = ticket.getPayload();
		const email = payload.email;
		const picture = payload.picture;
		let user = await UsertModel.findOne({
			"email": email,
		});

		if (!user) {
			user = new UsertModel(
				{
					email: email,
					picture: picture
				}
			);
			await user.save();
		}

		jwt.sign({
			"id": user.id,
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
				"id": user.id
			});
		});

	} catch (error) {
		return res.status(422).json({ errors: [{ msg: error.message, param: 'code' }] });
	}

}


function verify(req, res, next) {
	const authorization = req.headers['authorization'];
	if (!authorization || typeof authorization !== "string" || !authorization.indexOf(" ") > 0) {
		return res.status(401).json({
			"message": "token is required in header"
		});
	}
	const token = authorization.split(" ")[1];
	jwt.verify(token, config.privateKey, function (err, decoded) {
		if (err) {
			return res.status(401).json({
				"message": err.message
			});
		} else {
			res.locals.user = jwt.decode(token, { complete: true }).payload;
			return next();
		}
	});
}
