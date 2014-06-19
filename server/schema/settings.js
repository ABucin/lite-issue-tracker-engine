var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SettingsSchema = new Schema({
	key: {
		type: String,
		required: true,
		unique: true
	},
	displayUserActivity: {
		type: Boolean,
		default: false
	},
	displayUserChart: {
		type: Boolean,
		default: false
	},
	displayUserRole: {
		type: Boolean,
		default: false
	},
	displayUserEmail: {
		type: Boolean,
		default: false
	}
});

var Settings = mongoose.model("Settings", SettingsSchema);

exports.getSettings = function () {
	return Settings;
};

exports.getSettingsSchema = function () {
	return SettingsSchema;
};
