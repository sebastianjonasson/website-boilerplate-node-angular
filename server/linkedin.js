var request = require('request'),
	parseString = require('xml2js').parseString,
	credentials = require('../credentials');

var api_key = credentials.linkedin.api_key,
	api_secret = credentials.linkedin.api_secret,
	auth_code,
	access_token;

var profileData;

exports.auth = function(req, res) {
	if(!auth_code) {
		console.log("got something");
		console.log(req.query.code);
		auth_code = req.query.code;

		var tokenUrl = "https://www.linkedin.com/uas/oauth2/accessToken";
			tokenUrl += "?grant_type=authorization_code";
			tokenUrl += "&code="+auth_code;
			tokenUrl += "&redirect_uri=http://localhost:3000/linkedin/auth";
			tokenUrl += "&client_id="+api_key;
			tokenUrl += "&client_secret="+api_secret;

		request.post({url:tokenUrl}, function(err,httpResponse,body){ 
			body = JSON.parse(body);
			access_token = body.access_token;
			getProfile();
		})
	} else {
		getProfile();
	}
};

exports.profile = function(req, res) {
	res.json(profileData);
}

var getProfile = function() {
	var url = "https://api.linkedin.com/v1/people/~:(id,first-name,last-name,industry,skills,educations,picture-url,positions,connections)?oauth2_access_token="+access_token;
	console.log("url: "+url);
	request(url, function(error, response, body) {
		console.log(body);
		parseString(body, function (err, result) {
		    console.dir(result);
		    profileData = result;
		});
	});
}