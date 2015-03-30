/* 
 *	Includes
 */
var request = require('request'),
	credentials = require('../../credentials'),
	dataService = require('./data-services/linkedin');

/*
 *	Fields
 */
var api_key = credentials.linkedin.api_key,
	api_secret = credentials.linkedin.api_secret,
	auth_code,
	access_token;

var profileData;

/*
 *	Interface
 */
exports.requestAccessTokenAndProfile = function(code) {
	auth_code = code;
	var tokenUrl = buildTokenUrl();
	console.log(tokenUrl)
	return dataService.getAccessToken(tokenUrl)
				.then(function(token) {
					console.log(token)
					access_token = token;
				})
				.then(getProfile);
	
};

exports.getProfile = function() {
	return profileData;
}


/*
 *	Functions
 */
var getProfile = function() {
	var url = buildProfileEndpointUrl();
	return dataService.getProfile(url)
		.then(function(profile) {
			profileData = profile;
		})
}

var buildTokenUrl = function() {
	var tokenUrl = "https://www.linkedin.com/uas/oauth2/accessToken";
		tokenUrl += "?grant_type=authorization_code";
		tokenUrl += "&code="+auth_code;
		tokenUrl += "&redirect_uri="+credentials.domain.url+"/linkedin/auth";
		tokenUrl += "&client_id="+api_key;
		tokenUrl += "&client_secret="+api_secret;

	return tokenUrl;
}

var buildProfileEndpointUrl = function() {
	return "https://api.linkedin.com/v1/people/~:(id,first-name,last-name,industry,skills,specialties,educations,picture-urls::(original),positions,public-profile-url,num-connections,headline,location,summary)?format=json&oauth2_access_token="+access_token;
}