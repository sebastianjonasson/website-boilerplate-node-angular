var request = require('request'),
	clientId = "1621eab2d7f37ed98b77",
	clientSecret = "16aa520af558f808d7727917d86c80d08c000539",
	access_token,
	repos;

exports.githubAuthRoute = function(req, res) {
	var code = req.query.code,
		authData = {
			client_id: clientId,
			client_secret: clientSecret,
			code: code,
			accept: 'json'
		};

	request.post({url: "https://github.com/login/oauth/access_token", form: authData}, function(err,httpResponse,body){
		access_token = body.slice(13,53);
		var options = {
			params: {
				access_token: access_token
			},
			url: "https://api.github.com/user/repos?type=all&access_token="+access_token,
			headers: {
				'User-Agent': 'Personal Website'
			}
		}
		request.get(options, function(err,httpResponse,body) {
			repos = JSON.parse(body);
			console.log(repos);
		})
	})
}

exports.getRepos = function() {
	return repos;
}


//https://github.com/login/oauth/authorize?scope=user:email&client_id=1621eab2d7f37ed98b77