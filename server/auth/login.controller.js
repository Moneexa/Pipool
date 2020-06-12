const UsertModel = require('./user.model.js');
const config = require('../config.json');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const axios = require('axios');
const _config = require('../../pwa/src/auth/shared/auth.config.json')

module.exports = {
	login,
	loginFacebook,
	loginGoogle,
	loginLinkedin,
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

function loginLinkedin(req,res){
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	try{
	let email;
	// let name;
	let picture;
	const obj={
		code:req.body.code,
		grant_type: _config.linkedin.grant_type,
		client_id: _config.linkedin.clientId,
		client_secret : _config.linkedin.client_secret,
		redirect_uri: _config.linkedin.redirectURI
	}
axios.post(encodeURI('https://www.linkedin.com/oauth/v2/accessToken?'), {
	grant_type: obj.grant_type,
	code: obj.code,
	client_id: obj.client_id,
	client_secret:obj.client_secret,
	redirect_uri:obj.redirect_uri
  },  {
    'Content-Type': 'application/x-www-form-urlencoded'
  })
  .then((response) => {
	console.log(response);
  }).catch((error) => {
	console.error(error.message);
  });
}
catch{
	res.sendStatus(500).send("not working")
}

/*try {
		const url = encodeURI(`https://api.linkedin.com/v1/people/~:(id,first-name,last-name,headline,picture-url,location,industry,current-share,num-connections,summary,specialties,positions)?format=json&oauth2_access_token=${code}`)

			//const resp = await axios.get(url);
		//console.log(resp);
		axios.get(url)
			.then((axiosResponse) => {
				console.log(axiosResponse.data);
                 res.sendStatus(200).send(axiosResponse)
				//email = axiosResponse.data.email
				// name = axiosResponse.data.name
				//picture = axiosResponse.data.picture.data.url;
				/*return UsertModel.findOne({
					"email": email
				})
				.exec();
			})
			/*.then((user) => {
				if (!user) {
					user = new UsertModel(
						{
							email: email,
							//picture: picture,
						}
					);
					return user.save();
				}
				else {
					return user
				}
			})
			.then(user => {
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
			})
			.catch((error) => {
				//console.error(error);
				res.status(422).send("You have sent an incorrect token")
			});
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Not Working");
	}*/
}
function loginFacebook(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	let email;
	// let name;
	let picture;
	const code = req.body.code;
	try {
		const url = encodeURI(`https://graph.facebook.com/v7.0/me?access_token=${code}&fields=email,name,picture&format=json&method=get&pretty=0&transfer=cors`)
		//const resp = await axios.get(url);
		//console.log(resp);
		axios.get(url)
			.then((axiosResponse) => {
				console.log(axiosResponse);
				email = axiosResponse.data.email
				// name = axiosResponse.data.name
				picture = axiosResponse.data.picture.data.url;
				return UsertModel.findOne({
					"email": email
				})
				.exec();
			})
			.then((user) => {
				if (!user) {
					user = new UsertModel(
						{
							email: email,
							picture: picture,
						}
					);
					return user.save();
				}
				else {
					return user
				}
			})
			.then(user => {
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
			})
			.catch((error) => {
				console.error(error);
				res.status(422).send("You have sent an incorrect token")
			});
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
