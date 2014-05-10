var mongoose = require('mongoose');

/**
 * Required files.
 */
var schemaService = require('./schema');
var utilsService = require('./utils');
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
		key: utilsService.generateKey(),
		username: "psmith",
		role: "tester",
		project: "email-client",
		tickets: [{
			key: utilsService.generateKey(),
			code: "BG-1",
			title: "Email Validation Not Working",
			status: "testing",
			type: "bug",
			description: "The email validation is broken for several users."
		}, {
			key: utilsService.generateKey(),
			code: "BG-2",
			title: "Authentication Whitespace Handling",
			status: "created",
			type: "bug",
			description: "The authentication ignores whitespace."
		}, {
			key: utilsService.generateKey(),
			code: "BG-3",
			title: "Registration Page Header Missing",
			status: "fixed",
			type: "bug",
			description: "The registration page does not contain any headers."
		}, {
			key: utilsService.generateKey(),
			code: "BG-4",
			title: "Minor CSS Alignment Bug",
			status: "in_progress",
			type: "bug",
			description: "The logo is misaligned in IE6."
		}, {
			key: utilsService.generateKey(),
			code: "TA-1",
			title: "Implement User Registration Mechanism",
			status: "testing",
			type: "task",
			description: "Create a secure mechanism for registering an account."
		}, {
			key: utilsService.generateKey(),
			code: "TA-2",
			title: "Review Currency Conversion Code",
			status: "created",
			type: "task",
			description: "See title."
		}, {
			key: utilsService.generateKey(),
			code: "TA-3",
			title: "Plan Review Meeting",
			status: "in_progress",
			type: "task",
			description: "This Thursday at 10:00."
		}, {
			key: utilsService.generateKey(),
			code: "TA-4",
			title: "Implement User Password Reset Functionality",
			status: "created",
			type: "task",
			description: "Create a secure mechanism for resetting a password for an account."
		}, {
			key: utilsService.generateKey(),
			code: "TA-5",
			title: "Revoke Domain Credentials",
			status: "done",
			type: "task",
			description: "Revoke domain credentials for inactive users."
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
		estimatedTime: 200,
		loggedTime: 300
	});

	var secondUser = new User({
		key: utilsService.generateKey(),
		username: "abucin",
		role: "admin",
		project: "email-client",
		tickets: [{
			key: utilsService.generateKey(),
			code: "TA-6",
			title: "Add Colour Palette",
			status: "done",
			type: "task",
			description: "Create a colour palette for the website."
		}, {
			key: utilsService.generateKey(),
			code: "TA-7",
			title: "Remove Redundant Tests",
			status: "in_progress",
			type: "task",
			description: "Remove tests that are not used."
		}, {
			key: utilsService.generateKey(),
			code: "BG-5",
			title: "Syntax Highlighting Broken",
			status: "done",
			type: "bug",
			description: "See title."
		}, {
			key: utilsService.generateKey(),
			code: "BG-6",
			title: "Fix CSS Button Padding",
			status: "in_progress",
			type: "bug",
			description: "The login button has extra padding."
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
