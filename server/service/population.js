var mongoose = require('mongoose');

/**
 * Required files.
 */
var schemaService = require('./schema');
var utilsService = require('./utils');
var Log = schemaService.getLog();
var Ticket = schemaService.getTicket();
var Comment = schemaService.getComment();
var User = schemaService.getUser();

exports.populateDb = function () {

	/**
	 * Flushes ticket collection and adds some default data.
	 */
	Log.collection.drop();
	Ticket.collection.drop();
	Comment.collection.drop();
	User.collection.drop();

	var sampleTicketKey = utilsService.generateKey();

	var firstUser = new User({
		key: utilsService.generateKey(),
		username: "psmith",
		email: "psmith@dummy.com",
		password: "test",
		role: "tester",
		project: "email-client",
		tickets: [{
			key: utilsService.generateKey(),
			code: 1,
			title: "Email Validation Not Working",
			status: "testing",
			type: "bug",
			description: "The email validation is broken for several users.",
			owner: "psmith"
		}, {
			key: utilsService.generateKey(),
			code: 2,
			title: "Authentication Whitespace Handling",
			status: "created",
			type: "bug",
			description: "The authentication ignores whitespace.",
			owner: "psmith"
		}, {
			key: utilsService.generateKey(),
			code: 3,
			title: "Registration Page Header Missing",
			status: "fixed",
			type: "bug",
			description: "The registration page does not contain any headers.",
			owner: "psmith"
		}, {
			key: utilsService.generateKey(),
			code: 4,
			title: "Minor CSS Alignment Bug",
			status: "in_progress",
			type: "bug",
			description: "The logo is misaligned in IE6.",
			owner: "abucin"
		}, {
			key: utilsService.generateKey(),
			code: 5,
			title: "Implement User Registration Mechanism",
			status: "testing",
			type: "task",
			description: "Create a secure mechanism for registering an account.",
			owner: "abucin"
		}, {
			key: utilsService.generateKey(),
			code: 6,
			title: "Review Currency Conversion Code",
			status: "created",
			type: "task",
			description: "See title.",
			loggedTime: 8,
			owner: "psmith"
		}, {
			key: utilsService.generateKey(),
			code: 8,
			title: "Implement User Password Reset",
			status: "created",
			type: "task",
			description: "Create a secure mechanism for resetting a password for an account.",
			owner: "psmith"
		}, {
			key: utilsService.generateKey(),
			code: 9,
			title: "Revoke Domain Credentials",
			status: "done",
			type: "task",
			description: "Revoke domain credentials for inactive users.",
			loggedTime: 3,
			owner: "psmith"
		}],
		logs: [{
			key: utilsService.generateKey(),
			action: "times",
			target: "TA-2",
			targetType: "task"
}, {
			key: utilsService.generateKey(),
			action: "pencil",
			target: "BG-3",
			targetType: "bug"
}],
		comments: [{
			key: utilsService.generateKey(),
			content: "I think that the ticket should be marked as fixed.",
			ticket: sampleTicketKey
		}],
		estimatedTime: 200,
		loggedTime: 300
	});

	var secondUser = new User({
		key: utilsService.generateKey(),
		username: "abucin",
		email: "abucin@gmail.com",
		password: "test",
		role: "admin",
		project: "email-client",
		tickets: [{
			key: sampleTicketKey,
			code: 7,
			title: "Plan Review Meeting",
			status: "in_progress",
			type: "task",
			description: "This Thursday at 10:00.",
			owner: "abucin"
		}, {
			key: utilsService.generateKey(),
			code: 10,
			title: "Add Colour Palette",
			status: "done",
			type: "task",
			description: "Create a colour palette for the website.",
			owner: "psmith"
		}, {
			key: utilsService.generateKey(),
			code: 11,
			title: "Remove Redundant Tests",
			status: "in_progress",
			type: "task",
			description: "Remove tests that are not used.",
			owner: "abucin"
		}, {
			key: utilsService.generateKey(),
			code: 12,
			title: "Syntax Highlighting Broken",
			status: "done",
			type: "bug",
			description: "See title.",
			loggedTime: 6,
			owner: "abucin"
		}, {
			key: utilsService.generateKey(),
			code: 13,
			title: "Fix CSS Button Padding",
			status: "in_progress",
			type: "bug",
			description: "The login button has extra padding.",
			loggedTime: 5,
			owner: "abucin"
		}, {
			key: utilsService.generateKey(),
			code: 14,
			title: "Unassigned Ticket",
			status: "testing",
			type: "task",
			description: "This ticket is not assigned to anyone.",
			loggedTime: 0
		}],
		logs: [{
			key: utilsService.generateKey(),
			action: "comment",
			target: "TA-7",
			targetType: "task",
			comment: "I think this feature should be implemented in the next sprint."
		}, {
			key: utilsService.generateKey(),
			action: "clock-o",
			amount: 5,
			target: "BG-6",
			targetType: "bug"
		}, {
			key: utilsService.generateKey(),
			action: "comment",
			target: "BG-5",
			targetType: "bug",
			comment: "Bug fixed in commit 3d6h4."
		}],
		comments: [{
			key: utilsService.generateKey(),
			content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.",
			ticket: sampleTicketKey
		},{
			key: utilsService.generateKey(),
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
