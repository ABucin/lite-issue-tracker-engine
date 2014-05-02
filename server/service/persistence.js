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

exports.getAllUsers = function () {
	schemaService.getUser().find(function (err, users) {
		if (err) {
			return console.error(err);
		}
		persistedUsers = users;
	});

	return persistedUsers;
};

exports.getUser = function (username) {
	schemaService.getUser().findOne({
		'username': username
	}, function (err, user) {
		if (err) {
			return console.error(err);
		}
		persistedUsers = [user];
	});

	return persistedUsers;
};

exports.persistTicket = function (username, ticket) {
	var persistedTicket = new schemaService.getTicket()({
		code: ticket.code,
		title: ticket.title,
		status: 'created',
		type: ticket.type,
		description: ticket.description
	}); // create a new instance of the Ticket model

	// save the ticket and check for errors
	schemaService.getUser().findOne({
		'username': username
	}, function (err, user) {
		if (err) {
			return console.error(err);
		}

		user.tickets.push(persistedTicket);

		user.save(function (err) {
			if (err) {
				return console.error(err);
			}
		});;
	});

	return persistedTicket;
}

exports.getTickets = function (username) {
	schemaService.getUser().findOne({
		'username': username
	}, function (err, user) {
		if (err) {
			return console.error(err);
		}
		persistedUsers = [user.tickets];
	});

	return persistedUsers;
}
