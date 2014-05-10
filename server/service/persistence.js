var dbURI = 'mongodb://localhost/issuetracker';

var mongoose = require('mongoose');
var _ = require('underscore')._;

mongoose.connect(dbURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log("Connection to DB established.");
});

var populationService = require("./population");
var schemaService = require('./schema');
var utilsService = require('./utils');

var Ticket = schemaService.getTicket();
var User = schemaService.getUser();

exports.populateDb = function () {
	return populationService.populateDb();
}

exports.getAllUsers = function (res) {
	User.find(function (err, users) {
		if (err) {
			return console.error(err);
		}
		res.json(users);
	});
};

exports.getUser = function (username, res) {
	User.findOne({
		'username': username
	}, function (err, user) {
		if (err) {
			return console.error(err);
		}
		res.json([user]);
	});
};

exports.updateTicket = function (key, username, ticket, res) {
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
				if (ticket.loggedTime != null) {
					user.tickets[i].loggedTime = ticket.loggedTime;
				}
				if (ticket.estimatedTime != null) {
					user.tickets[i].estimatedTime = ticket.estimatedTime;
				}
				break;
			}
		}

		user.save(function (err) {
			if (err) {
				return console.error(err);
			}
			res.json(ticket);
		});
	});
};

exports.deleteTicket = function (key, username, res) {
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

		res.json(user);
	});
};

exports.createTicket = function (username, ticket, res) {
	var ticketData = {
		key: utilsService.generateKey(),
		title: ticket.title,
		status: 'created',
		type: ticket.type,
		description: ticket.description,
		loggedTime: ticket.loggedTime,
		estimatedTime: ticket.estimatedTime,
		creator: ticket.creator
	};

	// save the ticket and check for errors
	User.findOne({
		'username': username
	}, function (err, user) {
		if (err) {
			return console.error(err);
		}

		User.find(function (err, users) {
			if (err) {
				return console.error(err);
			}

			var tickets = [];

			_.each(users, function (e, i, list) {
				tickets = _.union(tickets, e.tickets);
			});

			var latestTicket = _.max(tickets, function (ticket) {
				return ticket.code;
			});

			ticketData.code = latestTicket.code + 1;
			user.tickets.push(new Ticket(ticketData));

			user.save(function (err) {
				if (err) {
					return console.error(err);
				}

				res.json(ticketData);
			});
		});

	});
};

exports.getTickets = function (username, res) {
	User.findOne({
		'username': username
	}, function (err, user) {
		if (err) {
			return console.error(err);
		}
		res.json([user.tickets]);
	});
};

exports.getAllLogs = function (res) {
	User.find().sort('-timestamp').exec(function (err, users) {
		if (err) {
			return console.error(err);
		}

		var logs = [];

		_.each(users, function (e, i, list) {
			logs = _.union(logs, e.logs);
		});

		res.json(logs);
	});
};
