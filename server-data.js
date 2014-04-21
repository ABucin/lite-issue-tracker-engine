var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/issuetracker');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var persistedTickets = [];

var ticketSchema = mongoose.Schema({
	code: {
		type: String,
		unique: true,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true
	},
	owner: {
		type: String
	},
	type: {
		type: String,
		required: true
	},
	description: {
		type: String
	}
});

var Ticket = mongoose.model("Ticket", ticketSchema);
/**
 * Flushes ticket collection and adds some default data.
 */
Ticket.collection.drop();
Ticket.create([
	{
		code: "BG-15",
		title: "Email Validation Not Working",
		status: "testing",
		owner: "abucin",
		type: "bug",
		description: "The email validation is broken for several users."
		}, {
		code: "BG-21",
		title: "Authentication Whitespace Handling",
		status: "created",
		owner: "abucin",
		type: "bug",
		description: "The authentication ignores whitespace."
		}, {
		code: "BG-5",
		title: "Registration Page Header Missing",
		status: "fixed",
		owner: "abucin",
		type: "bug",
		description: "The registration page does not contain any headers."
		}, {
		code: "BG-8",
		title: "Minor CSS Alignment Bug",
		status: "in_progress",
		owner: "abucin",
		type: "bug",
		description: "The logo is misaligned in IE6."
		}, {
		code: "BG-221",
		title: "Fix CSS Button Padding",
		status: "in_progress",
		owner: "psmith",
		type: "bug",
		description: "The login button has extra padding."
		}, {
		code: "TA-21",
		title: "Implement User Registration Mechanism",
		status: "testing",
		owner: "abucin",
		type: "task",
		description: "Create a secure mechanism for registering an account."
		}, {
		code: "TA-15",
		title: "Review Currency Conversion Code",
		status: "created",
		owner: "abucin",
		type: "task",
		description: "See title."
		}, {
		code: "TA-4",
		title: "Plan Review Meeting",
		status: "in_progress",
		owner: "abucin",
		type: "task",
		description: "This Thursday at 10:00."
		}, {
		code: "TA-8",
		title: "Implement User Password Reset Functionality",
		status: "created",
		owner: "abucin",
		type: "task",
		description: "Create a secure mechanism for resetting a password for an account."
		}, {
		code: "TA-10",
		title: "Revoke Domain Credentials",
		status: "done",
		owner: "abucin",
		type: "task",
		description: "Revoke domain credentials for inactive users."
		}, {
		code: "TA-110",
		title: "Add Colour Palette",
		status: "done",
		owner: "psmith",
		type: "task",
		description: "Create a colour palette for the website."
		}, {
		code: "TA-130",
		title: "Remove Redundant Tests",
		status: "in_progress",
		owner: "mlawrence",
		type: "task",
		description: "Remove tests that are not used."
		}, {
		code: "BG-130",
		title: "Syntax Highlighting Broken",
		status: "done",
		owner: "mlawrence",
		type: "bug",
		description: "See title."
		}
	]);

db.once('open', function callback() {

	Ticket.find(function (err, tickets) {
		if (err) return console.error(err);
		persistedTickets = tickets;
	});

});

/**
 * Temp file which stores server data until a DB is created.
 */
var logData = {
	"entries": [
		{
			"user": "mlawrence",
			"action": "comment",
			"target": "TA-92",
			"targetType": "task",
			"comment": "I think this feature should be implemented in the next sprint."
		}, {
			"user": "athompson",
			"action": "clock-o",
			"amount": 5,
			"target": "BG-32",
			"targetType": "bug"
		}, {
			"user": "psmith",
			"action": "times",
			"target": "TA-2",
			"targetType": "task"
		}, {
			"user": "athompson",
			"action": "pencil",
			"target": "BG-32",
			"targetType": "bug"
		}, {
			"user": "athompson",
			"action": "comment",
			"target": "BG-32",
			"targetType": "bug",
			"comment": "Bug fixed in commit 3d6h4."
		}
	]
};

var userData = {
	"users": [
		{
			"username": "psmith",
			"role": "tester",
			"project": "email-client",
			"tasks": 7,
			"estimatedTime": 200,
			"loggedTime": 300
		}, {
			"username": "athompson",
			"role": "developer",
			"project": "email-client",
			"tasks": 2,
			"estimatedTime": 15,
			"loggedTime": 85
		}, {
			"username": "mlawrence",
			"role": "developer",
			"project": "issue-tracker",
			"tasks": 5,
			"estimatedTime": 70,
			"loggedTime": 30
		}, {
			"username": "abucin",
			"role": "admin",
			"project": "email-client",
			"tasks": 0,
			"estimatedTime": 200,
			"loggedTime": 200
		}, {
			"username": "rgreen",
			"role": "tester",
			"project": "issue-tracker",
			"tasks": 3,
			"estimatedTime": 150,
			"loggedTime": 260
		}, {
			"username": "tmarceau",
			"role": "client",
			"project": "issue-tracker",
			"tasks": 1
		}
	]
};

exports.getMainData = function () {
	return {
		tickets: persistedTickets
	};
};

exports.getLogData = function () {
	return logData;
};

exports.getUserData = function () {
	return userData;
};
