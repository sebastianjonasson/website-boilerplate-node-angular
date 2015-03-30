/*
 *	Includes
 */
var request = require('request'),
	credentials = require('../../credentials'),
	dataService = require('./data-services/github');

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
	var authData = {
			client_id: clientId,
			client_secret: clientSecret,
			code: code,
			accept: 'json'
		};

	return dataService.getAccessToken(authData)
					  .then(function(token) {
					  	access_token = token;
					  	return token;
					  })
					  .then(getProfile)
					  .then(getRepos);
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
var getRepos = function() {
	return dataService.getRepos(access_token)
			   .then(function(reposData) {
			   		repos = reposData;
			   })
}

var getProfile = function() {
	return dataService.getRepos(access_token)
			   .then(function(profileData) {
			   		profile = profileData;
			   })
}