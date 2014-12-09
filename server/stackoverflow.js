var zlib = require('zlib'),
	request = require('request');

var access_token = "",
	key = "JxZP2dPMVoq6*GxQriseQw((",
	clientId = "3997",
	clientSecret = "lZ6LVwjlt3FwOsSrUu)GhQ((";

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

		})
	} else {
		console.log("other stuff");
			fetchStackExchangeData("LOLAAAA");
	}
}

var fetchStackExchangeData = function(endpoint) {
	var headers = {
      'Accept-Encoding': 'gzip'
    }
	reqData = {
		url: "https://api.stackexchange.com/2.2/me/answers?order=desc&sort=activity&site=stackoverflow&filter=!-*f(6t*ZdXeu&access_token="+access_token+"&key="+key,
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
	    console.log(sofData);
	});
	request(reqData)
		.pipe(gunzip)
}
var sofData = null;
exports.getData = function() {
	return sofData;
};