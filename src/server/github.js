/*
 *	Includes
 */
var request = require('request'),
	credentials = require('../../credentials');

/*
 *	Fields
 */
var clientId = credentials.github.client_id,
	clientSecret = credentials.github.client_secret,
	access_token,
	repos,
	profile;

/*
 *	Interface
 */
exports.requestAccessTokenAndData = function(code) {
	console.log(code);
	var authData = {
			client_id: clientId,
			client_secret: clientSecret,
			code: code,
			accept: 'json'
		};

	requestAccessToken(authData);
}

exports.getProfile = function() {
	return profile;
};
exports.getRepos = function() {
	return repos;
}

/*
 *	Functions
 */
var requestAccessToken = function(authData) {
	request.post({url: "https://github.com/login/oauth/access_token", form: authData}, function(err,httpResponse,body){
		console.log(body)
		access_token = body.slice(13,53);
		console.log(access_token);
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
	})
}