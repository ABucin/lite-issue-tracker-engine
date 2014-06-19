var mongoose = require('mongoose'),
	utils = require('./utils'),
	commentSchema = require('../schema/comment'),
	logSchema = require('../schema/log'),
	ticketSchema = require('../schema/ticket'),
	userSchema = require('../schema/user'),
	settingsSchema = require('../schema/settings'),
	Log = logSchema.getLog(),
	Ticket = ticketSchema.getTicket(),
	Comment = commentSchema.getComment(),
	User = userSchema.getUser(),
	Settings = settingsSchema.getSettings();

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
	var secondUserTickets = [];

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

	generateTicket(firstUserTickets, "Email Validation Not Working", "testing", "bug", "The email validation is broken for several users.", "psmith", "normal", 15, 20);
	generateTicket(firstUserTickets, "Authentication Whitespace Handling", "created", "bug", "The authentication ignores whitespace.", "psmith", "minor", 5, 10);
	generateTicket(firstUserTickets, "Registration Page Header Missing", "done", "bug", "The registration page does not contain any headers.", "psmith", "minor", 9, 18);
	generateTicket(firstUserTickets, "Minor CSS Alignment Bug", "in_progress", "bug", "The logo is misaligned in IE6.", "abucin", "major", 25, 12);
	generateTicket(firstUserTickets, "Review Currency Conversion Code", "created", "task", "Create a secure mechanism for registering an account.", "abucin", "major", 15, 30);
	generateTicket(firstUserTickets, "Implement User Password Reset", "created", "task", "See title.", "psmith", "normal", 20, 10);

	generateTicket(secondUserTickets, "Plan Review Meeting", "in_progress", "task", "This Thursday at 10:00.", "abucin", "normal", 10, 20);
	generateTicket(secondUserTickets, "Add Colour Palette", "testing", "task", "Create a colour palette for the website.", "", "major", 12, 12);
	generateTicket(secondUserTickets, "Remove Redundant Tests", "in_progress", "task", "Remove tests that are not used.", "abucin", "minor", 10, 5);
	generateTicket(secondUserTickets, "Fix CSS Button Padding", "in_progress", "bug", "The login button has extra padding.", "abucin", "minor", 10, 20);

	var sampleTicketKey = utils.generateKey();

	var firstUser = new User({
		key: utils.generateKey(),
		username: "psmith",
		email: "psmith@dummy.com",
		password: "test",
		role: "user",
		projectRole: "tester",
		project: "email-client",
		expertise: "Selenium, jQuery, JavaScript",
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
			action: "times",
			target: "2",
			targetType: "task",
			username: "psmith"
}, {
			key: utils.generateKey(),
			action: "clock-o",
			amount: 2,
			target: "3",
			targetType: "bug",
			username: "psmith",
			timestamp: new Date().setTime(new Date() - (1000 * 60 * 60 * 24)) // yesterday
		}, {
			key: utils.generateKey(),
			action: "clock-o",
			amount: 6,
			target: "2",
			targetType: "task",
			username: "psmith"
		}, {
			key: utils.generateKey(),
			action: "pencil",
			target: "3",
			targetType: "bug",
			username: "psmith"
}],
		comments: [{
			key: utils.generateKey(),
			content: "I think that the ticket should be marked as fixed.",
			ticket: sampleTicketKey
		}]
	});

	var secondUser = new User({
		key: utils.generateKey(),
		username: "abucin",
		email: "abucin@gmail.com",
		password: "test",
		role: "admin",
		projectRole: "developer",
		project: "email-client",
		expertise: "Java, PHP, JavaScript, Web Design",
		tickets: secondUserTickets,
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

	firstUser.save(function (err) {
		if (err) return console.error(err); // we should handle this

		secondUser.save(function (err) {
			if (err) return console.error(err); // we should handle this
		});
	});
};
