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
	var firstUserTickets = [];

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

	generateTicket(firstUserTickets, "Plan Review Meeting", "in_progress", "task", "This Thursday at 10:00.", "abucin", "normal", 10, 20);
	generateTicket(firstUserTickets, "Add Colour Palette", "testing", "task", "Create a colour palette for the website.", "", "major", 12, 12);
	generateTicket(firstUserTickets, "Remove Redundant Tests", "in_progress", "task", "Remove tests that are not used.", "abucin", "minor", 10, 5);
	generateTicket(firstUserTickets, "Fix CSS Button Padding", "in_progress", "bug", "The login button has extra padding.", "abucin", "minor", 10, 20);

	var sampleTicketKey = utils.generateKey();

	var firstUser = new User({
		key: utils.generateKey(),
		username: "abucin",
		email: "abucin@gmail.com",
		password: "abucin",
		salt: "124",
		hash: "124",
		role: "admin",
		projectRole: "developer",
		project: "email-client",
		expertise: "Java, PHP, JavaScript, Web Design",
		tickets: firstUserTickets,
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
			target: "7",
			targetType: "task",
			comment: "I think this feature should be implemented in the next sprint.",
			username: "abucin"
		}, {
			key: utils.generateKey(),
			action: "clock-o",
			amount: 5,
			target: "9",
			targetType: "task",
			username: "abucin"
		}, {
			key: utils.generateKey(),
			action: "comment",
			target: "5",
			targetType: "bug",
			comment: "Bug fixed in commit 3d6h4.",
			username: "abucin"
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
	//	firstUser.setPassword("test", function(){
	//		console.log("password set");
	//	});

	firstUser.save(function (err) {
		if (err) return console.error(err); // we should handle this
	});
};