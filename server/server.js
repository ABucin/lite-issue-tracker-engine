var express = require('express');
var bodyParser = require('body-parser');
var server = express();
var port = 3000;
var router = express.Router();

// Required files.
var persistenceService = require('./service/persistence');
var analyticsService = require('./service/analytics');

server.use(bodyParser());
server.use('/itracker/api', router);
// Set the path to the index.html file.
server.use(express.static(__dirname + "./../"));

server.listen(port);

// Add default data to database.
persistenceService.populateDb();

router.route('/users/:uname/tickets')
	.post(function (req, res) {
		persistenceService.createTicket(req.params.uname, req.body, res);
	})
	.get(function (req, res) {
		persistenceService.getTickets(req.params.uname, res);
	});

router.route('/users/:uname/tickets/:key')
	.put(function (req, res) {
		persistenceService.updateTicket(req.params.key, req.params.uname, req.body, res);
	})
	.delete(function (req, res) {
		persistenceService.deleteTicket(req.params.key, req.params.uname, res);
	});

router.route('/logs')
	.get(function (req, res) {
		persistenceService.getAllLogs(res);
	});

router.route('/analytics?:type')
.get(function (req, res) {
	analyticsService.getChart(req.query.type, res);
});

router.route('/users')
	.get(function (req, res) {
		persistenceService.getAllUsers(res);
	})
	.post(function (req, res) {
		persistenceService.createUser(req.body, res);
	});

router.route('/users?:uname')
	.get(function (req, res) {
		persistenceService.getUser(req.query.uname, res);
	});

console.log('Server started. Listening on port ' + port + '...');
