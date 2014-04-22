var express = require('express');
var server = express();

/**
 * Required files.
 */
var dataService = require('./server-data');

/*
 * Set the path to the index.html file.
 */
server.use(express.static(__dirname));

server.get('/itracker/api/tickets', function (req, res) {
	res.send(dataService.getTicketData());
});

server.get('/itracker/api/logs', function (req, res) {
	res.send(dataService.getLogData());
});

server.get('/itracker/api/users', function (req, res) {
	res.send(dataService.getUserData());
});

server.listen(3000);
console.log('Listening on port 3000...');
