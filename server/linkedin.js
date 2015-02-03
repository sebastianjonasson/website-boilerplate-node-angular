var api_key = "75zns7c2k18vb7",
	api_secret = "r7pyHANbHGI7Gj2S",
	oauth_token = "68fa3799-bacb-464b-be75-dd8f55144c65",
	oauth_key = "ba5e0d06-2436-43f2-9ec3-7ff0907a2762",
	auth_code,
	access_token;

var request = require('request'),
	parseString = require('xml2js').parseString;

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