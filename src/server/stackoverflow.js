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
	profiledata;

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

/*
 *	Functions
 */
var fetchStackExchangeData = function() {
	var endpoint = "/me/answers?order=desc&sort=activity&site=stackoverflow&filter=!*L7QmUk)4j2gbRPb";

	stackexchangeAPIRequest(endpoint, "get", function(data) {
		sofData = data;
	});
}
var fetchProfile = function() {
	var endpoint = "/me?order=desc&sort=reputation&site=stackoverflow&filter=!9YdnSAu50";

	stackexchangeAPIRequest(endpoint, "get", function(data) {
		profiledata = data;
	});
}

var stackexchangeAPIRequest = function(endpoint, method, cb) {
	var stackexchangeBaseUrl = "https://api.stackexchange.com/2.2",
		accessTokenAndKey = "&access_token="+access_token+"&key="+key,
		requestUrl = stackexchangeBaseUrl + endpoint + accessTokenAndKey,
		gunzip = zlib.createGunzip(),
		json = "",
		headers = {
		  'Accept-Encoding': 'gzip'
		};

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
	    console.log(profiledata);
	});

	request(reqData)
		.pipe(gunzip)
}
