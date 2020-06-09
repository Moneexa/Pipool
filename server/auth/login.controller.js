const express = require('express');
const router = express.Router();
const UsertModel = require('./user.model.js');
const bcrypt = require('bcrypt');
const myPrivateKey = "DrIFOD55QZhK4ZeXIdtcR3NoWmdV9nr0";
const jwt = require('jsonwebtoken');
/*module.exports = {
	router: router,
	verify: verify
};*/

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("529379787978-sgjjt3qpl23ivkp2boh1s3q03m3k5a8n.apps.googleusercontent.com");
exports.post = function (req, res) {

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
					}, myPrivateKey, {
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
exports._post = function (req, res,next) {
	async function verify() {
		const ticket = await client.verifyIdToken({
			idToken: req.body["_tokenObj"]["token"],
			audience: "529379787978-sgjjt3qpl23ivkp2boh1s3q03m3k5a8n.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
			// Or, if multiple clients access the backend:
			//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
		});
		const payload = ticket.getPayload();
		const userid = payload['sub'];
	}
	verify().catch(console.error);
	if (req.body["_tokenObj"]["email"]) {
		UsertModel.findOne({
			"email": req.body["_tokenObj"]["email"],
		}).exec(function (err, user) {
			if (err || !user) {
				let _user = new UsertModel(
					{
						email: req.body["_tokenObj"]["email"],
						password: '',
						role: '2',
						picture: req.body["_tokenObj"]["imgSrc"]
			
					}
				);
			
				_user.save(function (err) {
					if (err) {
						return next (err);
					}
					res.send('user Created successfully')
				})
			}

			else {
				jwt.sign({
					"id": user._id,
					"role": user.role
				}, myPrivateKey, {
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
			}

		});
	}

	// If request specified a G Suite domain:
	// const domain = payload['hd'];
}


exports.verify = function (req, res, next) {
	const authorization = req.headers['authorization'];
	if (!authorization || typeof authorization !== "string" || !authorization.indexOf(" ") > 0) {
		return res.status(401).json({
			"message": "token is required in header"
		});
	}
	const token = authorization.split(" ")[1];
	jwt.verify(token, myPrivateKey, function (err, decoded) {
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
