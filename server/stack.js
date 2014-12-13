var request = require('request'),
	express = require('express'),
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
	//

app.get('/code', sof.authRoute);
app.get('/github/auth', github.githubAuthRoute)

app.get('/stack', function(req, res) {
	res.json(sof.getData());
})

app.get('/repos', function(req, res) {
	res.json(github.getRepos());
})


console.log("up and running!");
app.listen(3000);

app.use('/client', express.static('../front'));
app.use('/bower_components', express.static('../bower_components'));