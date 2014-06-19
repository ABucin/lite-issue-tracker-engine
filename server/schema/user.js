var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	comment = require('../schema/comment'),
	log = require('../schema/log'),
	ticket = require('../schema/ticket'),
	settings = require('../schema/settings'),
	LogSchema = log.getLogSchema(),
	TicketSchema = ticket.getTicketSchema(),
	CommentSchema = comment.getCommentSchema(),
	SettingsSchema = settings.getSettingsSchema();

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
	comments: [CommentSchema],
	settings: [SettingsSchema]
});

var User = mongoose.model("User", UserSchema);

exports.getUser = function () {
	return User;
};

exports.getUserSchema = function () {
	return UserSchema;
};
