const config = require('../config.json');
const jwt = require('jsonwebtoken');

module.exports = {
    verify
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