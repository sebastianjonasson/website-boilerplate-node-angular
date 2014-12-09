var request = require('request'),
	app = require('express')();

	var fullUrl = "https://accounts.google.com/o/oauth2/auth?client_id=231522717589-tfsnmb7jn379qud7j5vj9d8suothil1l.apps.googleusercontent.com&response_type=code&redirect_uri=http://localhost:3000&scope=email%20profile";

var tokenUrl = "https://accounts.google.com/o/oauth2/auth";
	tokenUrl += "?client_id=231522717589-tfsnmb7jn379qud7j5vj9d8suothil1l.apps.googleusercontent.com";
	tokenUrl += "&response_type=code";
	tokenUrl += "&redirect_uri=http://localhost:3000";
	tokenUrl += "&scope=email%20profile";

request(fullUrl, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log("err!") // Print the google web page.
  } else {
    console.log("OK!");
  }
})

var gmailEndpoinst = "https://www.googleapis.com/gmail/v1/users/sebastianjonasson@gmail.com/messages";

app.get('/auth', function(req, res) {
	res.send(req);
});
app.get('/:code?', function(req, res) {
	var code = req.query.code;
	console.log(code);
	res.send(req.query.code);
	console.log("herer")
	var url = "https://www.googleapis.com/oauth2/v3/token";
	var postData = {
		code: code,
		client_id: "231522717589-tfsnmb7jn379qud7j5vj9d8suothil1l.apps.googleusercontent.com",
		client_secret: "7Sw8Tgrjoy2EOHKN6jUIZQvk",
		grant_type: "authorization_code",
		redirect_uri: "http://localhost:3000/auth"
	}

	var options = {
		method:"post",
		url:url,
		form: postData,
		//headers: "Content-Type: application/x-www-form-urlencoded"
	};
	var callback = function(err, httpResponse, body) {
		console.log("asdasd")

		console.log(body);
	}
	console.log("here111r")
	request(options, callback);
});

app.listen(3000);