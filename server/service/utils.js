/**
 * Generates an 8-char random key used for identifying entities.
 */
exports.generateKey = function () {
	var key = "";
	var domain = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 8; i++)
		key += domain.charAt(Math.floor(Math.random() * domain.length));

	return key;
};
