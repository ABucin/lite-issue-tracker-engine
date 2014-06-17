var dbURI = 'mongodb://localhost/issuetracker';

var mongoose = require('mongoose');
var _ = require('underscore')._;

mongoose.connect(dbURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log('Connection to DB established.');
});

var schema = require('../schema/schema');
var utils = require('../utils/utils');

var Ticket = schema.getTicket();
var User = schema.getUser();
var Log = schema.getLog();
var Comment = schema.getComment();

/**
 * Users.
 */
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

exports.createUser = function (user, res) {
	var errorResponse = [];
	var userData = {
		key: utils.generateKey(),
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
			_.each(err.errors, function (e, i, l) {
				errorResponse.push({
					message: e.message.split('Path ')[1]
				});
			});
			res.send(500, errorResponse);
		}

		res.json({
			message: 'User created!'
		});
	});
};

/**
 * Tickets.
 */
exports.createTicket = function (username, ticket, res) {
	var ticketData = {
		key: utils.generateKey(),
		title: ticket.title,
		status: 'created',
		type: ticket.type,
		description: ticket.description,
		loggedTime: ticket.loggedTime,
		estimatedTime: ticket.estimatedTime,
		owner: ticket.owner,
		priority: ticket.priority
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
						el.priority = ticket.priority;

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
				}
			});

			_.each(user.comments, function (comment, ix, innerList) {
				if (comment.ticket == key) {
					user.comments.splice(ix, 1);
				}
			});

			user.save(function (err) {
				if (err) {
					res.send(500, err);
				}
				res.json();
			});
		});
	});
};

/**
 * Comments.
 */
exports.createComment = function (username, ticket, comment, res) {
	var commentData = {
		key: utils.generateKey(),
		ticket: ticket,
		content: comment.content,
		author: comment.author,
		timestamp: new Date()
	};

	// save the comment and check for errors
	User.findOne({
		'username': username
	}, function (err, user) {
		if (err) {
			res.send(500, err);
		}

		user.comments.push(new Comment(commentData));

		user.save(function (err) {
			if (err) {
				res.send(500, err);
			}
			res.json(commentData);
		});
	});
};

exports.deleteComment = function (key, username, res) {
	User.findOne({
		'username': username
	}, function (err, user) {
		if (err) {
			res.send(500, err);
		}

		_.each(user.comments, function (comment, ix, innerList) {
			if (comment.key == key) {
				user.comments.splice(ix, 1);
			}
		});

		user.save(function (err) {
			if (err) {
				res.send(500, err);
			}
			res.json();
		});
	});
};

exports.getComments = function (key, res) {
	User.find().exec(function (err, users) {
		if (err) {
			res.send(500, err);
		}
		var comments = [];

		_.each(users, function (user, i, list) {
			_.each(user.comments, function (comment, ix, innerList) {
				if (comment.ticket == key) {
					var c = {
						key: comment.key,
						author: user.username,
						ticket: comment.ticket,
						timestamp: comment.timestamp,
						content: comment.content
					};
					comments.push(c);
				}
			});
		});
		res.json(comments);
	});
};

exports.updateComment = function (key, ticket, username, comment, res) {
	// save the comment and check for errors
	User.findOne({
		'username': username
	}, function (err, user) {
		var errorResponse = [];
		if (err) {
			res.send(500, err);
		}

		_.each(user.comments, function (c, i, list) {
			if (c.key == key && c.ticket == ticket) {

				if (comment.content != null && comment.content.length) {
					c.content = comment.content;
					c.isEdited = true;
				} else {
					errorResponse.push({
						message: 'Content must be provided.'
					});
				}

				if (errorResponse.length) {
					res.send(500, errorResponse);
				} else {
					user.save(function (err) {
						if (err) {
							res.send(500, err);
						}
						res.json(c);
					});
				}
			}
		});
	});
};

/**
 * Logs.
 */
exports.getAllLogs = function (res) {
	User.find()
		.sort('-timestamp')
		.limit(10)
		.exec(function (err, users) {
			if (err) {
				res.send(500, err);
			}

			var logs = [];

			_.each(users, function (e, i, list) {
				logs = _.union(logs, e.logs);
			});

			logs.sort(function (a, b) {
				if (a.timestamp < b.timestamp) return 1;
				if (b.timestamp < a.timestamp) return -1;
				return 0;
			});

			res.json(logs);
		});
};

exports.createLog = function (username, log, res) {
	var logData = {
		key: utils.generateKey(),
		action: log.action,
		target: log.target,
		targetType: log.targetType,
		comment: log.comment,
		amount: log.amount,
		username: log.username,
		timestamp: new Date()
	};

	// save the log and check for errors
	User.findOne({
		'username': username
	}, function (err, user) {
		if (err) {
			res.send(500, err);
		}

		user.logs.push(new Log(logData));

		user.save(function (err) {
			if (err) {
				res.send(500, err);
			}
			res.json(logData);
		});
	});
};
