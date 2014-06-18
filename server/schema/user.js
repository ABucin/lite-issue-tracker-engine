var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	commentSchema = require('../schema/comment'),
	logSchema = require('../schema/log'),
	ticketSchema = require('../schema/ticket'),
	LogSchema = logSchema.getLogSchema(),
	TicketSchema = ticketSchema.getTicketSchema(),
	CommentSchema = commentSchema.getCommentSchema();

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
	projectRole: {
		type: String,
		required: true
	},
	project: {
		type: String,
		required: true
	},
	expertise: {
		type: String
	},
	tickets: [TicketSchema],
	logs: [LogSchema],
	comments: [CommentSchema]
});

var User = mongoose.model("User", UserSchema);

exports.getUser = function () {
	return User;
};

exports.getUserSchema = function () {
	return UserSchema;
};
