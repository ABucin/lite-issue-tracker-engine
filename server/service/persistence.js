var dbURI = 'mongodb://localhost/issuetracker';

var mongoose = require('mongoose');
mongoose.connect(dbURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log("Connection to DB established.");
});

var populationService = require("./population");
var schemaService = require('./schema');

var persistedTickets = [];
var persistedUsers = [];
var persistedLogs = [];

exports.populateDb = function () {
	return populationService.populateDb();
}

exports.getAllTickets = function () {
	schemaService.getTicket().find(function (err, tickets) {
		if (err) {
			return console.error(err);
		}
		persistedTickets = tickets;
	});

	return persistedTickets;
};

exports.getAllLogs = function () {
	schemaService.getLog().find(function (err, logs) {
		if (err) {
			return console.error(err);
		}
		persistedLogs = logs;
	});

	return persistedLogs;
};

exports.getAllUsers = function () {
	schemaService.getUser().find(function (err, users) {
		if (err) {
			return console.error(err);
		}
		persistedUsers = users;
	});

	return persistedUsers;
};
