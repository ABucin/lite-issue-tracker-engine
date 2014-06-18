var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

var Comment = mongoose.model("Comment", CommentSchema);

exports.getComment = function () {
	return Comment;
};

exports.getCommentSchema = function () {
	return CommentSchema;
};
