'use strict';

// import the node packages
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.get('/portfolio', function(req, res) {
	res.sendfile('portfolio.html');
});

app.listen(process.env.PORT || 3000, function() {
	console.log("Server is listening to port", process.env.PORT || 3000);
});