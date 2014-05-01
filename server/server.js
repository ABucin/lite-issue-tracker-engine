var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var port = 3000;
var router = express.Router();

// configure server to use bodyParser()
// this will let us get the data from a POST
server.use(bodyParser());
server.use('/itracker/api', router);

/**
 * Required files.
 */
var persistenceService = require('./service/persistence');

/*
 * Add default data to database.
 */
persistenceService.populateDb();

/*
 * Set the path to the index.html file.
 */
server.use(express.static(__dirname + "./../"));

router.route('/tickets').get(function (req, res) {
	//res.send(persistenceService.getAllTickets());
});

router.route('/logs').get(function (req, res) {
	//res.send(persistenceService.getAllLogs());
});

router.route('/users').get(function (req, res) {
	res.send(persistenceService.getAllUsers());
});

router.route('/users?:uname').get(function (req, res) {
	res.send(persistenceService.getUser(req.query.uname));
});

server.listen(port);
console.log('Listening on port ' + port + '...');
