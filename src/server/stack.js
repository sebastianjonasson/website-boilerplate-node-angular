var request = require('request'),
	express = require('express'),
	app = express(),
	linkedin = require('./linkedin'),
	stackoverflow = require('./stackoverflow'),
	github = require('./github');


app.get('/code', stackoverflow.authRoute);
app.get('/github/auth', github.githubAuthRoute);
app.get('/linkedin/auth', linkedin.auth);
app.get('/stackoverflow/answers', stackoverflow.answers)
app.get('/stackoverflow/questions', stackoverflow.questions)
app.get('/stackoverflow/profile', stackoverflow.profile)
app.get('/stackoverflow/activity', stackoverflow.activity)
app.get('/github/repos', github.repos);
app.get('/github/profile', github.profile);
app.get('/linkedin/profile', linkedin.profile);


app.use('/client', express.static('../front'));
app.use('/public', express.static('../../public'));
app.use('/bower_components', express.static('../../bower_components'));


console.log("up and running!");
app.listen(3000);