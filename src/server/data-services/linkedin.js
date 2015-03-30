var request = require('request'),
	Q = require('q');

exports.getAccessToken = function(url) {
	var deffered = Q.defer();

	request.post({url:url}, function(err,httpResponse,body){ 
		if (err) deffered.reject(err);
		body = JSON.parse(body);
		access_token = body.access_token;
		console.log(access_token);
		deffered.resolve(access_token);
	});

	return deffered.promise;
}

exports.getProfile = function(url) {
	var deffered = Q.defer();
	request(url, function(err, response, body) {
		if (err) deffered.reject(err)
		profileData = JSON.parse(body);
		deffered.resolve(profileData);
	});
	return deffered.promise;
}

