var linkedin = require('./../linkedin');

exports.profile = function(req, res) {
	res.json(linkedin.getProfile());
}

exports.auth = function(req, res) { 
	var auth_code = req.query.code;

	linkedin.requestAccessTokenAndProfile(auth_code);
};