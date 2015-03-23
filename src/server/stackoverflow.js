/*
 *	Includes
 */
var zlib = require('zlib'),
	request = require('request'),
	credentials = require('../../credentials');

/*
 *	Fields
 */
var access_token = "",
	key = credentials.stackoverflow.api_key,
	clientId = credentials.stackoverflow.client_id,
	clientSecret = credentials.stackoverflow.client_secret,
	sofData,
	profiledata,
	activityData;

/*
 *	Interface
 */
exports.authRoute = function(req, res) {
	if(access_token == "") {
		var token = req.query.code;
		var tokenUrl = "https://stackexchange.com/oauth/access_token";
		var formData = {
			client_id: clientId,
			client_secret: clientSecret,
			code: token,
			redirect_uri: credentials.domain.url+"/code",
		}
		request.post({url:tokenUrl, form: formData}, function(err,httpResponse,body){ 
			var myToken = body.slice(13, 37);
			access_token  = myToken;
			fetchStackExchangeData();
			fetchProfile();
			fetchActivity();
			console.log(access_token);

		})
	} else {
		fetchStackExchangeData();
		fetchProfile();
	}
}

exports.getData = function() {
	return sofData;
};
exports.profile = function(req, res) {
	res.json(profiledata);
}

exports.items = function(req, res) {
	res.json(sofData);
}
exports.activity = function(req, res) {
	res.json(activityData);
}

/*
 *	Functions
 */
var fetchStackExchangeData = function() {
	var endpoint = "/me/answers";
	var getParams = "&order=desc&sort=activity&site=stackoverflow&filter=!*L7QmUk)4j2gbRPb";

	stackexchangeAPIRequest(endpoint, getParams, "get", function(data) {
		sofData = data;
	});
}
var fetchProfile = function() {
	var endpoint = "/me";
	var getParams = "&order=desc&sort=reputation&site=stackoverflow&filter=!9YdnSAu50";

	stackexchangeAPIRequest(endpoint, getParams, "get", function(data) {
		profiledata = data;
	});
}

var fetchActivity = function() {
	var endpoint = "/me/network-activity";

	stackexchangeAPIRequest(endpoint, "", "get", function(data) {
		activityData = data;
	});
}

var stackexchangeAPIRequest = function(endpoint, getParams, method, cb) {
	var stackexchangeBaseUrl = "https://api.stackexchange.com/2.2",
		accessTokenAndKey = "?access_token="+access_token+"&key="+key,
		requestUrl = stackexchangeBaseUrl + endpoint + accessTokenAndKey + getParams,
		gunzip = zlib.createGunzip(),
		json = "",
		headers = {
		  'Accept-Encoding': 'gzip'
		};

	console.log(requestUrl);

	reqData = {
		url: requestUrl,
		method:method,
		headers: headers
	};

	gunzip.on('data', function(data){
	    json += data.toString();
	});

	gunzip.on('end', function(){
		var data = JSON.parse(json);
		cb(data);
	});

	request(reqData)
		.pipe(gunzip)
}
