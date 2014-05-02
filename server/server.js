var express = require('express');
var bodyParser = require('body-parser');
var server = express();
var port = 3000;
var router = express.Router();

// Required files.
var persistenceService = require('./service/persistence');

server.use(bodyParser());
server.use('/itracker/api', router);
// Set the path to the index.html file.
server.use(express.static(__dirname + "./../"));

server.listen(port);

// Add default data to database.
persistenceService.populateDb();

router.route('/users/:uname/tickets')
	.post(function (req, res) {
		res.json(persistenceService.persistTicket(req.params.uname, req.body));
	})
	.get(function (req, res) {
		res.json(persistenceService.getTickets(req.params.uname));
	});

router.route('/logs').get(function (err, req, res) {
	//res.send(persistenceService.getAllLogs());
});

router.route('/users')
	.get(function (err, req, res) {
		res.json(persistenceService.getAllUsers());
	});

router.route('/users?:uname').get(function (err, req, res) {
	res.json(persistenceService.getUser(req.query.uname));
});

console.log('Listening on port ' + port + '...');
