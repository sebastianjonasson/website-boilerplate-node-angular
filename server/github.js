var request = require('request'),
	credentials = require('../credentials');

var clientId = credentials.github.client_id,
	clientSecret = credentials.github.client_secret,
	access_token,
	repos,
	profile;

exports.githubAuthRoute = function(req, res) {
	var code = req.query.code,
		authData = {
			client_id: clientId,
			client_secret: clientSecret,
			code: code,
			accept: 'json'
		};

	request.post({url: "https://github.com/login/oauth/access_token", form: authData}, function(err,httpResponse,body){
		access_token = body.slice(13,53);
		getRepos();
		getProfile();
	})
}

var getRepos = function() {
	var options = {
		params: {
			access_token: access_token
		},
		url: "https://api.github.com/user/repos?type=all&access_token="+access_token,
		headers: {
			'User-Agent': 'Personal Website'
		}
	}
	
	request.get(options, function(err,httpResponse,body) {
		repos = JSON.parse(body);
		console.log(repos);
	})
}

var getProfile = function() {
	var optionsProfile = {
		params: {
			access_token: access_token
		},
		url: "https://api.github.com/user?access_token="+access_token,
		headers: {
			'User-Agent': 'Personal Website'
		}
	}
	request.get(optionsProfile, function(err,httpResponse,body) {
		profile = JSON.parse(body);
		console.log("profile");
	})
}

exports.getRepos = function() {
	return repos;
}
exports.getProfile = function() {
	return profile;
}