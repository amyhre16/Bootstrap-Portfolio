'use strict';

// import the node packages
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var SparkPost = require('sparkpost');
var env = require('envs');

var sparky = new SparkPost();

var app = express();
var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.post('/api/sendEmail', function(req, res) {
	var _name = req.body.name;
	var _email = req.body.email;
	var _message = req.body.message;

	sparky.transmissions.send({
		content: {
			from: _email,
			subject: _name + "'s Message",
			html: "<html><body><p>" + _message + "</p></body></html>"
		},
		recipients: [
		{address: 'anthony.myhre@utexas.edu'}
		]
	})
	.then(data => {
		console.log('Woohoo! You just sent your first mailing!');
		console.log(data);
	})
	.catch(err => {
		console.log('Whoops! Something went wrong');
		console.log(err);
	})

	// sendEmail(_name, _email, _subject, _message);
});

/*function sendEmail(_name, _email, _subject, _message) {
	nodeMandrill('/messages/send', {
		message: {
			to: [{
				email: 'anthony.myhre@utexas.edu',
				name: 'Anthony Myhre'
			}],
			from_email: _email,
			subject: _subject,
			text: _message
		}
	}, function(error, response) {
		if (error) {
			throw error;
		}

	});
}*/

app.listen(PORT, function() {
	console.log("Server is listening to port " + PORT);
});