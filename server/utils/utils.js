/**
 * Generates an 8-char random key used for uniquely identifying entities.
 */
exports.generateKey = function () {
	var key = "",
		length = 8,
		source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < length; i++) {
		key += source.charAt(Math.floor(Math.random() * source.length));
	}

	return key;
};
