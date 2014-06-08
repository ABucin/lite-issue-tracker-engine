var express = require('express');
var bodyParser = require('body-parser');
var server = express();
var port = 3000;
var router = express.Router();

// Required files.
var populationService = require('./service/population');
var persistenceService = require('./service/persistence');
var analyticsService = require('./service/analytics');
var configurationService = require('./service/settings');

server.use(bodyParser());
server.use('/itracker/api', router);
// Set the path to the index.html file.
server.use(express.static(__dirname + "./../"));

server.listen(port);

// Add default data to database.
populationService.populateDb();

/**
 * Users.
 */
router.route('/users')
	.get(function (req, res) {
		persistenceService.getAllUsers(res);
	})
	.post(function (req, res) {
		persistenceService.createUser(req.body, res);
	});

router.route('/users/:uname')
	.get(function (req, res) {
		persistenceService.getUser(req.params.uname, res);
	});

router.route('/tickets/:key/comments')
	.get(function (req, res) {
		persistenceService.getComments(req.params.key, res);
	});

router.route('/users/:uname/tickets/:key/comments')
	.post(function (req, res) {
		persistenceService.createComment(req.params.uname, req.params.key, req.body, res);
	});

router.route('/users/:uname/tickets/:ticketKey/comments/:key')
	.put(function (req, res) {
		persistenceService.updateComment(req.params.key, req.params.ticketKey, req.params.uname, req.body, res);
	});

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

router.route('/config?:type')
	.get(function (req, res) {
		configurationService.getConfig(req.query.type, res);
	});

console.log('Server started. Listening on port ' + port + '...');
