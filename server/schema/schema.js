var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
	key: {
		type: String,
		required: true,
		unique: true
	},
	code: {
		type: Number,
		required: true,
		unique: true
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	status: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	description: {
		type: String,
		trim: true
	},
	estimatedTime: {
		type: Number,
		default: 0
	},
	loggedTime: {
		type: Number,
		default: 0
	},
	owner: {
		type: String
	},
	priority: {
		type: String,
		default: "normal"
	}
});

var LogSchema = new Schema({
	key: {
		type: String,
		required: true,
		unique: true
	},
	action: {
		type: String,
		required: true
	},
	target: {
		type: String,
		required: true
	},
	targetType: {
		type: String,
		required: true
	},
	comment: {
		type: String
	},
	amount: {
		type: Number,
		default: 0
	},
	username: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
});

var CommentSchema = new Schema({
	key: {
		type: String,
		required: true,
		unique: true
	},
	content: {
		type: String,
		required: true
	},
	ticket: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now
	},
	isEdited: {
		type: Boolean,
		default: false
	}
});

var UserSchema = new Schema({
	key: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	},
	project: {
		type: String,
		required: true
	},
	tickets: [TicketSchema],
	logs: [LogSchema],
	comments: [CommentSchema],
	estimatedTime: {
		type: Number,
		default: 0
	},
	loggedTime: {
		type: Number,
		default: 0
	}
});

var Ticket = mongoose.model("Ticket", TicketSchema);
var User = mongoose.model("User", UserSchema);
var Log = mongoose.model("Log", LogSchema);
var Comment = mongoose.model("Comment", CommentSchema);

exports.getTicket = function () {
	return Ticket;
};

exports.getUser = function () {
	return User;
};

exports.getLog = function () {
	return Log;
};

exports.getComment = function () {
	return Comment;
};
