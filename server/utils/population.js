var mongoose = require('mongoose'),
	utils = require('./utils'),
	Comment = require('../model/comment'),
	Log = require('../model/log'),
	Ticket = require('../model/ticket'),
	User = require('../model/user'),
	Settings = require('../model/settings');

exports.populateDb = function () {

	/**
	 * Flushes all collections and adds some default data.
	 */
	Settings.collection.drop();
	Log.collection.drop();
	Ticket.collection.drop();
	Comment.collection.drop();
	User.collection.drop();

	var code = 0;
	var userTickets = [];
	var user2Tickets = [];

	var generateTicket = function (tickets, title, status, type, description, owner, priority, estimatedTime, loggedTime) {
		return tickets.push({
			key: utils.generateKey(),
			code: ++code,
			title: title,
			status: status,
			type: type,
			description: description,
			owner: owner,
			priority: priority,
			estimatedTime: estimatedTime,
			loggedTime: loggedTime
		});
	}

	generateTicket(userTickets, "Plan Review Meeting", "inProgress", "task", "This Thursday at 10:00.", "abucin", "normal", 10, 20);
	generateTicket(userTickets, "Add Colour Palette", "testing", "task", "Create a colour palette for the website.", "", "major", 12, 12);
	generateTicket(userTickets, "Remove Redundant Tests", "done", "task", "Remove tests that are not used.", "abucin", "minor", 10, 5);
	generateTicket(userTickets, "Fix CSS Button Padding", "done", "bug", "The login button has extra padding.", "abucin", "minor", 10, 20);
	generateTicket(userTickets, "Fix Responsive Menu", "inProgress", "bug", "The menu needs to be made responsive.", "abucin", "minor", 15, 10);

	generateTicket(user2Tickets, "Test Batch Script", "testing", "task", "The deployment script should be tested.", "psmith", "normal", 25, 13);
	generateTicket(user2Tickets, "Fix Missing Authentication Header.", "inProgress", "bug", "Add the missing header.", "psmith", "major", 5, 26);
	generateTicket(user2Tickets, "Fix Login Page CSS", "done", "bug", "Fix Login Page CSS.", "psmith", "major", 15, 23);

	var sampleTicketKey = utils.generateKey();
	var yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	var user = new User({
		key: utils.generateKey(),
		username: "abucin",
		email: "abucin@gmail.com",
		firstName: "Andrei",
		lastName: "Bucin",
		salt: null,
		hash: null,
		role: "admin",
		projectRole: "tester",
		project: "issue-tracker",
		expertise: "Java, PHP, JavaScript, Web Design.",
		tickets: userTickets,
		settings: [{
			key: utils.generateKey(),
			displayUserActivity: true,
			displayUserChart: true,
			displayUserEmail: true,
			displayUserRole: true
		}],
		logs: [{
			key: utils.generateKey(),
			action: "comment",
			target: "1",
			targetType: "task",
			comment: "I think this feature should be implemented in the next sprint.",
			username: "abucin",
			timestamp: new Date()
		}, {
			key: utils.generateKey(),
			action: "clock-o",
			amount: 3,
			target: "2",
			targetType: "task",
			username: "abucin",
			timestamp: yesterday
		}, {
			key: utils.generateKey(),
			action: "comment",
			target: "3",
			targetType: "bug",
			comment: "Bug fixed in commit 3d6h4.",
			username: "abucin",
			timestamp: new Date()
		}],
		comments: [{
			key: utils.generateKey(),
			content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.",
			ticket: sampleTicketKey
		}, {
			key: utils.generateKey(),
			content: "That is correct. I will do it soon.",
			ticket: sampleTicketKey
		}]
	});

	var user2 = new User({
		key: utils.generateKey(),
		username: "psmith",
		email: "psmith@gmail.com",
		firstName: "Peter",
		lastName: "Smith",
		salt: null,
		hash: null,
		role: "user",
		projectRole: "developer",
		project: "unassigned",
		expertise: "JavaScript, HTML5, CSS3.",
		tickets: user2Tickets,
		settings: [{
			key: utils.generateKey(),
			displayUserActivity: true,
			displayUserChart: true,
			displayUserEmail: true,
			displayUserRole: true
		}],
		logs: [{
			key: utils.generateKey(),
			action: "clock-o",
			amount: 4,
			target: "6",
			targetType: "task",
			username: "psmith",
			timestamp: new Date()
		}, {
			key: utils.generateKey(),
			action: "clock-o",
			amount: 6,
			target: "6",
			targetType: "task",
			username: "psmith",
			timestamp: yesterday
		}],
		comments: []
	});

	user.setPassword("abucin", function () {
		user.save(function (err) {
			if (err) {
				return console.error(err); // we should handle this
			} else {
				user2.save(function (err) {
					if (err) {
						return console.error(err); // we should handle this
					}
				});
			}
		});
	});


};
