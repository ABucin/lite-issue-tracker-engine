var mongoose = require('mongoose'),
	schema = require('../schema/schema'),
	utils = require('../utils/utils'),
	Log = schema.getLog(),
	Ticket = schema.getTicket(),
	Comment = schema.getComment(),
	User = schema.getUser();

exports.populateDb = function () {

	/**
	 * Flushes ticket collection and adds some default data.
	 */
	Log.collection.drop();
	Ticket.collection.drop();
	Comment.collection.drop();
	User.collection.drop();

	var code = 0;
	var firstUserTickets = [];
	var secondUserTickets = [];

	var generateTicket = function (tickets, title, status, type, description, owner) {
		return tickets.push({
			key: utils.generateKey(),
			code: code++,
			title: title,
			status: status,
			type: type,
			description: description,
			owner: owner
		});
	}

	generateTicket(firstUserTickets, "Email Validation Not Working", "testing", "bug", "The email validation is broken for several users.", "psmith");
	generateTicket(firstUserTickets, "Authentication Whitespace Handling", "created", "bug", "The authentication ignores whitespace.", "psmith");
	generateTicket(firstUserTickets, "Registration Page Header Missing", "fixed", "bug", "The registration page does not contain any headers.", "psmith");
	generateTicket(firstUserTickets, "Minor CSS Alignment Bug", "in_progress", "bug", "The logo is misaligned in IE6.", "abucin");
	generateTicket(firstUserTickets, "Review Currency Conversion Code", "created", "task", "Create a secure mechanism for registering an account.", "abucin");
	generateTicket(firstUserTickets, "Implement User Password Reset", "created", "task", "See title.", "psmith");

	generateTicket(secondUserTickets, "Plan Review Meeting", "in_progress", "task", "This Thursday at 10:00.", "abucin");
	generateTicket(secondUserTickets, "Add Colour Palette", "done", "task", "Create a colour palette for the website.", "psmith");
	generateTicket(secondUserTickets, "Remove Redundant Tests", "in_progress", "task", "Remove tests that are not used.", "abucin");
	generateTicket(secondUserTickets, "Fix CSS Button Padding", "in_progress", "bug", "The login button has extra padding.", "abucin");

	var sampleTicketKey = utils.generateKey();

	var firstUser = new User({
		key: utils.generateKey(),
		username: "psmith",
		email: "psmith@dummy.com",
		password: "test",
		role: "tester",
		project: "email-client",
		tickets: firstUserTickets,
		logs: [{
			key: utils.generateKey(),
			action: "times",
			target: "TA-2",
			targetType: "task",
			username: "psmith"
}, {
			key: utils.generateKey(),
			action: "pencil",
			target: "BG-3",
			targetType: "bug",
			username: "psmith"
}],
		comments: [{
			key: utils.generateKey(),
			content: "I think that the ticket should be marked as fixed.",
			ticket: sampleTicketKey
		}],
		estimatedTime: 200,
		loggedTime: 300
	});

	var secondUser = new User({
		key: utils.generateKey(),
		username: "abucin",
		email: "abucin@gmail.com",
		password: "test",
		role: "admin",
		project: "email-client",
		tickets: secondUserTickets,
		logs: [{
			key: utils.generateKey(),
			action: "comment",
			target: "TA-7",
			targetType: "task",
			comment: "I think this feature should be implemented in the next sprint.",
			username: "abucin"
		}, {
			key: utils.generateKey(),
			action: "clock-o",
			amount: 5,
			target: "BG-6",
			targetType: "bug",
			username: "abucin"
		}, {
			key: utils.generateKey(),
			action: "comment",
			target: "BG-5",
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
		}],
		estimatedTime: 200,
		loggedTime: 200
	});

	firstUser.save(function (err) {
		if (err) return console.error(err); // we should handle this

		secondUser.save(function (err) {
			if (err) return console.error(err); // we should handle this
		});
	});
};
