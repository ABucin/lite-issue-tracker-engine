var dbURI = 'mongodb://localhost/issuetracker';

var mongoose = require('mongoose');
var _ = require('underscore')._;

mongoose.connect(dbURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log('Connection to DB established.');
});

var populationService = require('./population');
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
			res.send(500, err);
		}
		res.json(users);
	});
};

exports.getUser = function (username, res) {
	User.findOne({
		'username': username
	}, function (err, user) {
		if (err) {
			res.send(500, err);
		}
		res.json([user]);
	});
};

exports.updateTicket = function (key, username, ticket, res) {
	// save the ticket and check for errors
	User.find().exec(
		function (err, users) {
			var errorResponse = [];
			if (err) {
				res.send(500, err);
			}

			_.each(users, function (user, i, list) {
				_.each(user.tickets, function (el, ix, innerList) {
					if (el.key == key) {

						if (ticket.title != null && ticket.title.length) {
							el.title = ticket.title;
						} else {
							errorResponse.push({
								message: 'Title must be provided.'
							});
						}
						if (ticket.status != null) {
							el.status = ticket.status;
						}
						if (ticket.loggedTime != null) {
							el.loggedTime = ticket.loggedTime;
						}
						if (ticket.estimatedTime != null) {
							el.estimatedTime = ticket.estimatedTime;
						}
						el.description = ticket.description;
						el.owner = ticket.owner;

						if (errorResponse.length) {
							res.send(500, errorResponse);
						} else {
							user.save(function (err) {
								if (err) {
									res.send(500, err);
								}
								res.json(ticket);
							});
						}
					}
				});
			});
		}
	);
};

exports.deleteTicket = function (key, username, res) {
	User.find().exec(function (err, users) {
		if (err) {
			res.send(500, err);
		}

		_.each(users, function (user, i, list) {
			_.each(user.tickets, function (ticket, ix, innerList) {
				if (ticket.key == key) {
					user.tickets.splice(ix, 1);
					user.save(function (err) {
						if (err) {
							res.send(500, err);
						}
						res.json();
					});
				}
			});
		});
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
		owner: ticket.owner
	};

	// save the ticket and check for errors
	User.findOne({
		'username': username
	}, function (err, user) {
		if (err) {
			res.send(500, err);
		}

		User.find(function (err, users) {
			if (err) {
				res.send(500, err);
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
					res.send(500, err);
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
			res.send(500, err);
		}
		res.json([user.tickets]);
	});
};

exports.getAllLogs = function (res) {
	User.find().sort('-timestamp').exec(function (err, users) {
		if (err) {
			res.send(500, err);
		}

		var logs = [];

		_.each(users, function (e, i, list) {
			logs = _.union(logs, e.logs);
		});

		res.json(logs);
	});
};

exports.createUser = function (user, res) {
	var errorResponse = [];
	var userData = {
		key: utilsService.generateKey(),
		email: user.email,
		username: user.email.split('@')[0],
		password: user.password,
		role: 'user',
		project: 'issue-tracker',
		tickets: [],
		logs: []
	};

	if (!user.password.length) {
		errorResponse.push({
			message: 'Password must be provided.'
		});
	}

	if (!user.email.length) {
		errorResponse.push({
			message: 'Email address must be provided.'
		});
	}

	if (user.password !== user.repeatedPassword) {
		errorResponse.push({
			message: 'Passwords do not match.'
		});
	}

	if (errorResponse.length) {
		res.send(500, errorResponse);
	}

	var persistedUser = new User(userData);

	persistedUser.save(function (err) {
		if (err) {
			var errorResponse = [];
			for (var k in err.errors) {
				var message = err.errors[k].message.split('Path ')[1];
				errorResponse.push({
					message: message
				});
			}
			res.send(500, errorResponse);
		}

		res.json({
			message: 'User created!'
		});
	});
};
