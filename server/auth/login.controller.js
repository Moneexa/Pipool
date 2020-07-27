const UsertModel = require('./user.model.js');
const config = require('../config.json');
//const bcrypt = require('bcrypt');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const axios = require('axios');
var querystring = require('querystring');
const Twitter = require('twitter-lite');

module.exports = {
	login,
	loginFacebook,
	loginGoogle,
	loginLinkedin,
	
	verify
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

const { OAuth2Client } = require('google-auth-library');
const { create } = require('./user.model.js');
const client = new OAuth2Client("529379787978-sgjjt3qpl23ivkp2boh1s3q03m3k5a8n.apps.googleusercontent.com");
async function login(req, res) {

	if (req.body.email && req.body.password) {
		UsertModel.findOne({
			"email": req.body.email,
		}).exec(function (err, user) {
			if (err || !user) {
				return res.sendStatus(400);
			}
			else {

				crypto.pbkdf2(req.body.password, 'salt', 100, 64, 'sha512', (err, derivedKey) => {
					var passed=false;
					if(derivedKey===user.password){
                       passed=true
					}
					if (err || !passed) {
						return res.status(401).send("Invalid credentials");
					}
					// jwt.sign({
					// 	"id": user._id,
					// 	"role": user.role,

					// }, config.privateKey, {
					// 	expiresIn: '1d'
					// }, 
					signToken(user._id, user._name, user.role, undefined, function (err, token) {
						console.log(err);
						if (err) {
							console.log(err);

							return res.sendStatus(500);
						}
						res.json({
							"id": user._id,
							"name": user.name,
							"role": user.role,
							"token":
							{
								"value": token,
								"expiry": (new Date()).setDate((new Date()).getDate() + 1)
							}
						});
					})


				})
			}
		});
	}
	else {
		res.sendStatus(400);
	}
}

async function loginLinkedin(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	try {
		let email;
		let name;
		let picture;

		const params = {
			code: req.body.code,
			grant_type: config.linkedin.grant_type,
			client_id: config.linkedin.clientId,
			client_secret: config.linkedin.client_secret,
			redirect_uri: "http://localhost:3000" + config.linkedin.redirectURI
		}
		let response = await axios.post(
			encodeURI('https://www.linkedin.com/oauth/v2/accessToken'),
			querystring.stringify(params),
			{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		);

		// fetching email
		const access_token = response.data.access_token;
		const url = encodeURI(`https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))`)
		response = await axios.get(
			url,
			{
				headers: {
					'Authorization': `Bearer ${access_token}`,
					'cache-control': 'no-cache',
					'X-Restli-Protocol-Version': '2.0.0'
				}
			}
		);
		if (!response.data || !response.data.elements || !response.data.elements.length || !response.data.elements[0]['handle~']) {
			throw Error('Invalid response');
		}
		email = response.data.elements[0]['handle~'].emailAddress;

		// fetching profile picture and name
		response = await axios.get(
			"https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))",
			{
				headers: {
					'Authorization': `Bearer ${access_token}`,
					'cache-control': 'no-cache',
					'X-Restli-Protocol-Version': '2.0.0'
				}
			}
		);
		const imagesLength = response.data.profilePicture['displayImage~'].elements.length;
		const preferredLocale = response.data.firstName.preferredLocale.language + '_' + response.data.firstName.preferredLocale.country;
		name = response.data.firstName.localized[preferredLocale] + ' ' + response.data.lastName.localized[preferredLocale]
		picture = response.data.profilePicture['displayImage~'].elements[imagesLength - 1].identifiers[0].identifier;

		let user = await createAndGetProfile(email, name, picture);
		signToken(
			user.id,
			user.name,
			user.role,
			user.picture,
			function (error, token) {
				if (error) {
					res.status(500).send("Unable to sign jwt");
				}

				const tomorrow = new Date();
				tomorrow.setDate(tomorrow.getDate() + 1);

				res.status(200).send(
					{
						id: user.id,
						name: user.name,
						role: user.role,
						picture: user.picture,
						token: {
							value: token,
							expiry: tomorrow
						}
					}
				)
			}
		)


	}
	catch (error) {
		console.log(error.code);
		console.log(error.message);
		res.status(500).send("not working")
	}
}

async function loginFacebook(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	let email;
	let name;
	let picture;
	const code = req.body.code;
	try {
		const url = encodeURI(`https://graph.facebook.com/v7.0/me?access_token=${code}&fields=email,name,picture&format=json&method=get&pretty=0&transfer=cors`)
		//const resp = await axios.get(url);
		//console.log(resp);
		let response = await axios.get(url);
		email = response.data.email;
		name = response.data.name;
		picture = response.data.picture.data.url;

		let user = await createAndGetProfile(email, name, picture);
		signToken(
			user.id,
			user.name,
			user.role,
			user.picture,
			function (error, token) {
				if (error) {
					res.status(500).send("Unable to sign jwt");
				}
				const tomorrow = new Date();
				tomorrow.setDate(tomorrow.getDate() + 1);
				res.status(200).send(
					{
						id: user.id,
						name: user.name,
						role: user.role,
						picture: user.picture,
						token: {
							value: token,
							expiry: tomorrow
						}
					}
				)
			}
		)
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
		const name = payload.name;
		let user = await createAndGetProfile(email, name, picture);

		signToken(user.id, user.name, user.role, user.picture, function (err, token) {
			if (err) {
				console.log(err);
				return res.sendStatus(500);
			}

			const tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			res.status(200).send(
				{
					id: user.id,
					name: user.name,
					role: user.role,
					picture: user.picture,
					token: {
						value: token,
						expiry: tomorrow
					}
				}
			)
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
