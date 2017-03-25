'use strict';

// import the node packages
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.post('/sendEmail', function(req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var message = req.body.message;

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'gmail.user@gmail.com',
			pass: 'yourpass'
		}
	});

	// setup email data with unicode symbols
	var mailOptions = {
		from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
		to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
		subject: 'Hello ✔', // Subject line
		text: 'Hello world ?', // plain text body
		html: '<b>Hello world ?</b>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
	});
});

app.listen(process.env.PORT || 3000, function() {
	console.log("Server is listening to port " + PORT);
});