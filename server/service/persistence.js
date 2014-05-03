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
var utilsService = require('./utils');

var persistedTickets = [];
var persistedUsers = [];
var persistedLogs = [];

var deletedTicket = {};

var Ticket = schemaService.getTicket();
var User = schemaService.getUser();

exports.populateDb = function () {
	return populationService.populateDb();
}

exports.getAllUsers = function () {
	User.find(function (err, users) {
		if (err) {
			return console.error(err);
		}
		persistedUsers = users;
	});

	return persistedUsers;
};

exports.getUser = function (username) {
	User.findOne({
		'username': username
	}, function (err, user) {
		if (err) {
			return console.error(err);
		}
		persistedUsers = [user];
	});

	return persistedUsers;
};

exports.updateTicket = function (key, username, ticket) {
	// save the ticket and check for errors
	User.findOne({
		'username': username
	}, function (err, user) {
		if (err) {
			return console.error(err);
		}

		for (var i in user.tickets) {
			if (user.tickets[i].key == key) {
				if (ticket.title != null) {
					user.tickets[i].title = ticket.title;
				}
				if (ticket.status != null) {
					user.tickets[i].status = ticket.status;
				}
				if (ticket.description != null) {
					user.tickets[i].description = ticket.description;
				}
				break;
			}
		}

		user.save(function (err) {
			if (err) {
				return console.error(err);
			}
		});
	});

	return ticket;
};

exports.deleteTicket = function (key, username) {
	User.findOne({
		'username': username
	}, function (err, user) {
		if (err) {
			return console.error(err);
		}

		for (var i in user.tickets) {
			if (user.tickets[i].key == key) {
				user.tickets.splice(i, 1);
				break;
			}
		}

		user.save(function (err) {
			if (err) {
				return console.error(err);
			}
		});
	});

	return deletedTicket;
};

exports.createTicket = function (username, ticket) {
	var ticketData = {
		key: utilsService.generateKey(),
		code: ticket.code,
		title: ticket.title,
		status: 'created',
		type: ticket.type,
		description: ticket.description
	};
	var persistedTicket = new Ticket(ticketData); // create a new instance of the Ticket model

	// save the ticket and check for errors
	User.findOne({
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
		});
	});

	return ticketData;
};

exports.getTickets = function (username) {
	User.findOne({
		'username': username
	}, function (err, user) {
		if (err) {
			return console.error(err);
		}
		persistedUsers = [user.tickets];
	});

	return persistedUsers;
};
