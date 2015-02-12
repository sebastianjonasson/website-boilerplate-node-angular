var zlib = require('zlib'),
	request = require('request'),
	credentials = require('../../credentials');

var access_token = "",
	key = credentials.stackoverflow.api_key,
	clientId = credentials.stackoverflow.client_id,
	clientSecret = credentials.stackoverflow.client_secret;

exports.authRoute = function(req, res) {
	if(access_token == "") {
		var token = req.query.code;
		var tokenUrl = "https://stackexchange.com/oauth/access_token";
		var formData = {
			client_id: clientId,
			client_secret: clientSecret,
			code: token,
			redirect_uri: "http://localhost:3000/code",
		}
		request.post({url:tokenUrl, form: formData}, function(err,httpResponse,body){ 
			var myToken = body.slice(13, 37);
			access_token  = myToken;
			fetchStackExchangeData("LOLAAAA");
			fetchProfile();

		})
	} else {
		fetchStackExchangeData("LOLAAAA");
		fetchProfile();
	}
}

var fetchStackExchangeData = function(endpoint) {
	var headers = {
      'Accept-Encoding': 'gzip'
    }
	reqData = {
		url: "https://api.stackexchange.com/2.2/me/answers?order=desc&sort=activity&site=stackoverflow&filter=!*L7QmUk)4j2gbRPb&access_token="+access_token+"&key="+key,
		method:"get",
		headers: headers
	}
	var zlib = require('zlib');
    var gunzip = zlib.createGunzip();
	var json = "";
	gunzip.on('data', function(data){
	    json += data.toString();
	});
	gunzip.on('end', function(){
		var data = JSON.parse(json);
		sofData = data;
	});
	request(reqData)
		.pipe(gunzip)
}
var fetchProfile = function() {
	var headers = {
      'Accept-Encoding': 'gzip'
    }
	reqData = {
		url: "https://api.stackexchange.com/2.2/me?order=desc&sort=reputation&site=stackoverflow&filter=!9YdnSAu50&access_token="+access_token+"&key="+key,
		method:"get",
		headers: headers
	}
	var zlib = require('zlib');
    var gunzip = zlib.createGunzip();
	var json = "";
	gunzip.on('data', function(data){
	    json += data.toString();
	});
	gunzip.on('end', function(){
		var data = JSON.parse(json);
		profiledata = data;
	    console.log(profiledata);
	});
	request(reqData)
		.pipe(gunzip)
}
var sofData = null;
var profiledata = null;
exports.getData = function() {
	return sofData;
};
exports.profile = function(req, res) {
	res.json(profiledata);
}

exports.items = function(req, res) {
	res.json(sofData);
}