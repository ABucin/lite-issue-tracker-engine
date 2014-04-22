var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/issuetracker');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var persistedTickets = [];
var persistedUsers = [];
var persistedLogs = [];

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
		type: String,
		required: true
		/*,
		ref: "User"*/
	},
	type: {
		type: String,
		required: true
	},
	description: {
		type: String
	}
});

var userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	role: {
		type: String,
		required: true
	},
	project: {
		type: String,
		required: true
	},
	tasks: {
		type: Number,
		default: 0
	},
	estimatedTime: {
		type: Number,
		default: 0
	},
	loggedTime: {
		type: Number,
		default: 0
	}
});

var logSchema = mongoose.Schema({
	user: {
		type: String,
		required: true,
		/*ref:"User"*/
	},
	action: {
		type: String,
		required: true
	},
	target: {
		type: String,
		required: true,
		/*ref:"Ticket"*/
	},
	targetType: {
		type: String,
		required: true
	},
	comment: {
		type: String
	},
	amount: {
		type: Number
	}
});

var Ticket = mongoose.model("Ticket", ticketSchema);
var User = mongoose.model("User", userSchema);
var Log = mongoose.model("Log", logSchema);

/**
 * Flushes ticket collection and adds some default data.
 */
Log.collection.drop();
Ticket.collection.drop();
User.collection.drop();

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
		owner: "psmith",
		type: "task",
		description: "Remove tests that are not used."
		}, {
		code: "BG-130",
		title: "Syntax Highlighting Broken",
		status: "done",
		owner: "psmith",
		type: "bug",
		description: "See title."
		}
	]);

User.create([{
	username: "psmith",
	role: "tester",
	project: "email-client",
	tasks: 7,
	estimatedTime: 200,
	loggedTime: 300
		}, {
	username: "abucin",
	role: "admin",
	project: "email-client",
	tasks: 5,
	estimatedTime: 200,
	loggedTime: 200
		}]);

Log.create([
	{
		user: "abucin",
		action: "comment",
		target: "TA-92",
		targetType: "task",
		comment: "I think this feature should be implemented in the next sprint."
		}, {
		user: "abucin",
		action: "clock-o",
		amount: 5,
		target: "BG-32",
		targetType: "bug"
		}, {
		user: "psmith",
		action: "times",
		target: "TA-2",
		targetType: "task"
		}, {
		user: "psmith",
		action: "pencil",
		target: "BG-32",
		targetType: "bug"
		}, {
		user: "abucin",
		action: "comment",
		target: "BG-32",
		targetType: "bug",
		comment: "Bug fixed in commit 3d6h4."
		}
]);

db.once('open', function callback() {

	Ticket.find(function (err, tickets) {
		if (err) return console.error(err);
		persistedTickets = tickets;
	});

	User.find(function (err, users) {
		if (err) return console.error(err);
		persistedUsers = users;
	});

	Log.find(function (err, logs) {
		if (err) return console.error(err);
		persistedLogs = logs;
	});

});

exports.getTicketData = function () {
	return {
		tickets: persistedTickets
	};
};

exports.getLogData = function () {
	return {
		entries: persistedLogs
	};
};

exports.getUserData = function () {
	return {
		users: persistedUsers
	};
};
