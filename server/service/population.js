var mongoose = require('mongoose');

/**
 * Required files.
 */
var schemaService = require('./schema');
var Log = schemaService.getLog();
var Ticket = schemaService.getTicket();
var User = schemaService.getUser();

exports.populateDb = function () {

	/**
	 * Flushes ticket collection and adds some default data.
	 */
	Log.collection.drop();
	Ticket.collection.drop();
	User.collection.drop();

	var firstUser = new User({
		username: "psmith",
		role: "tester",
		project: "email-client",
		tickets: [{
			code: "BG-15",
			title: "Email Validation Not Working",
			status: "testing",
			type: "bug",
			description: "The email validation is broken for several users."
		}, {
			code: "BG-21",
			title: "Authentication Whitespace Handling",
			status: "created",
			type: "bug",
			description: "The authentication ignores whitespace."
		}, {
			code: "BG-5",
			title: "Registration Page Header Missing",
			status: "fixed",
			type: "bug",
			description: "The registration page does not contain any headers."
		}, {
			code: "BG-8",
			title: "Minor CSS Alignment Bug",
			status: "in_progress",
			type: "bug",
			description: "The logo is misaligned in IE6."
		}, {
			code: "TA-21",
			title: "Implement User Registration Mechanism",
			status: "testing",
			type: "task",
			description: "Create a secure mechanism for registering an account."
		}, {
			code: "TA-15",
			title: "Review Currency Conversion Code",
			status: "created",
			type: "task",
			description: "See title."
		}, {
			code: "TA-4",
			title: "Plan Review Meeting",
			status: "in_progress",
			type: "task",
			description: "This Thursday at 10:00."
		}, {
			code: "TA-8",
			title: "Implement User Password Reset Functionality",
			status: "created",
			type: "task",
			description: "Create a secure mechanism for resetting a password for an account."
		}, {
			code: "TA-10",
			title: "Revoke Domain Credentials",
			status: "done",
			type: "task",
			description: "Revoke domain credentials for inactive users."
		}],
		logs: [{
			action: "times",
			target: "TA-2",
			targetType: "task"
}, {
			action: "pencil",
			target: "BG-32",
			targetType: "bug"
}],
		estimatedTime: 200,
		loggedTime: 300
	});

	var secondUser = new User({
		username: "abucin",
		role: "admin",
		project: "email-client",
		tickets: [{
			code: "TA-110",
			title: "Add Colour Palette",
			status: "done",
			type: "task",
			description: "Create a colour palette for the website."
		}, {
			code: "TA-130",
			title: "Remove Redundant Tests",
			status: "in_progress",
			type: "task",
			description: "Remove tests that are not used."
		}, {
			code: "BG-130",
			title: "Syntax Highlighting Broken",
			status: "done",
			type: "bug",
			description: "See title."
		}, {
			code: "BG-221",
			title: "Fix CSS Button Padding",
			status: "in_progress",
			type: "bug",
			description: "The login button has extra padding."
		}],
		logs: [{
			action: "comment",
			target: "TA-92",
			targetType: "task",
			comment: "I think this feature should be implemented in the next sprint."
		}, {
			action: "clock-o",
			amount: 5,
			target: "BG-32",
			targetType: "bug"
		}, {
			action: "comment",
			target: "BG-32",
			targetType: "bug",
			comment: "Bug fixed in commit 3d6h4."
		}],
		estimatedTime: 200,
		loggedTime: 200
	});

	firstUser.save(function (err) {
		if (err) return console.error(err); // we should handle this
	});
	secondUser.save(function (err) {
		if (err) return console.error(err); // we should handle this
	});

};
