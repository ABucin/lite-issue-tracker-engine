var mongoose = require('mongoose');

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

exports.getTicket = function() {
	return Ticket;
};

exports.getUser = function() {
	return User;
};

exports.getLog = function() {
	return Log;
};
