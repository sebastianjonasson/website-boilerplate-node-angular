var github = require('./../github');

exports.profile = function(req, res) {
	res.json(github.getProfile());
}

exports.repos = function(req, res) {
	res.json(github.getRepos());
}

exports.githubAuthRoute = function(req, res) {
	var code = req.query.code;

	github.requestAccessTokenAndData(code);
}