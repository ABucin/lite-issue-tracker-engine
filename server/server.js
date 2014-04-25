var express = require('express');
var server = express();

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

server.get('/itracker/api/tickets', function (req, res) {
	//res.send(persistenceService.getAllTickets());
});

server.get('/itracker/api/logs', function (req, res) {
	//res.send(persistenceService.getAllLogs());
});

server.get('/itracker/api/users', function (req, res) {
	res.send(persistenceService.getAllUsers());
});

server.get('/itracker/api/users?:uname', function (req, res) {
	res.send(persistenceService.getUser(req.query.uname));
});

server.listen(3000);
console.log('Listening on port 3000...');
