var request = require('request'),
	express = require('express'),
	linkedin = require('./linkedin'),
	app = express(),
	clientId = "3997",
	key = "JxZP2dPMVoq6*GxQriseQw((",
	clientSecret = "lZ6LVwjlt3FwOsSrUu)GhQ((",
	codeUrl = "https://stackexchange.com/oauth";
	codeUrl += "?client_id="+clientId;
	codeUrl += "&redirect_uri=http://localhost:3000/code";
	var sof = require('./stackoverflow');
	var github = require('./github');
	var stackOverFlowData = null;

	//stackoverflow
	//https://stackexchange.com/oauth?client_id=3997&scope=no_expiry,private_info&redirect_uri=http://localhost:3000/code

	//github
	//https://github.com/login/oauth/authorize?scope=user:email&client_id=1621eab2d7f37ed98b77

	//linkedin
	//https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=75zns7c2k18vb7&scope=r_fullprofile&state=asdf1337lolWTF&redirect_uri=http://localhost:3000/linkedin/auth


app.get('/code', sof.authRoute);
app.get('/github/auth', github.githubAuthRoute);
app.get('/linkedin/auth', linkedin.auth);

app.get('/stackoverflow/items', function(req, res) {
	res.json(sof.getData());
})
app.get('/stackoverflow/profile', function(req, res) {
	res.json(sof.getProfile());
})

app.get('/github/repos', function(req, res) {
	res.json(github.getRepos());
})

app.get('/github/profile', function(req, res) {
	res.json(github.getProfile());
})

app.get('/linkedin/profile', linkedin.profile);



console.log("up and running!");
app.listen(3000);

app.use('/client', express.static('../front'));
app.use('/bower_components', express.static('../bower_components'));




