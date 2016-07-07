var express = require('express');
var mailin = require('./libs/mailin.js');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

app.get('/', function (req, res) {
	res.sendFile('index.html')
});

app.post('/sendMail', function(req, res) {

	var email = req.body.email;

	var client = new Mailin("https://api.sendinblue.com/v2.0", "A2IgtLBKMnQTUWhF", 1000);    //Optional parameter: Timeout in MS
	var data = { "email" : email };

	console.log('sending', data);
	client.create_update_user(data).on('complete', function(data) {
		res.sendStatus(200);
		console.log('HERE');
	}, function() {
		console.log('error');
	});

});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});

