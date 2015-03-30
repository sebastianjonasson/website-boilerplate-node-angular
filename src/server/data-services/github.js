var Q = require('q'),
	request = require('request');

exports.getAccessToken = function(auth_data) {
	var deffered = Q.defer(),
		options = {
			url: "https://github.com/login/oauth/access_token",
			form: auth_data
		}

	request.post(options, function(err, httpResponse, body){
		if (err) deffered.reject(err);
		var access_token = body.slice(13,53);
		deffered.resolve(access_token);
	})

	return deffered.promise;
}

exports.getRepos = function(access_token) {
	var deffered = Q.defer(),
		options = {
		params: {
			access_token: access_token
		},
		url: "https://api.github.com/user/repos?type=all&access_token="+access_token,
		headers: {
			'User-Agent': 'Personal Website'
		}
	}

	request.get(options, function(err,httpResponse,body) {
		if (err) deffered.reject(err);
		var repos = JSON.parse(body);
		deffered.resolve(repos);
	})

	return deffered.promise;
}

exports.getProfile = function(access_token) {
	var deffered = Q.defer(),
		optionsProfile = {
			params: {
				access_token: access_token
			},
			url: "https://api.github.com/user?access_token="+access_token,
			headers: {
				'User-Agent': 'Personal Website'
			}
		}

	request.get(optionsProfile, function(err,httpResponse,body) {
		if (err) deffered.reject(err);
		profile = JSON.parse(body);
		deffered.resolve(profile);
	})
}