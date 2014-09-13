/**
 * Capitalizes a word.
 */
app.filter('capitalize', function () {
	return function (input) {
		if (input !== undefined) {
			return input.charAt(0).toUpperCase() + input.slice(1);
		}
		return input;
	};
});

/**
 * Introduces a text ellipsis after a set number of characters.
 */
app.filter('abbreviate', function () {
	return function (input) {
		var maxInputLength = 80;
		if (input !== undefined && input.length > maxInputLength) {
			return input.substring(0, maxInputLength) + " [...]";
		}
		return input;
	};
});

/**
 * Returns a moment in time as text.
 */
app.filter('momentInTime', function () {
	return function (date) {
		var now = Date.now();
		var diff = Math.floor((now - Date.parse(date)) / 1000);
		var result = 'Just now';

		if (diff > 2 && diff < 60) {
			result = diff + ' seconds ago';
		} else if (diff >= 60 && diff < 120) {
			result = '1 minute ago';
		} else if (diff >= 121 && diff < 3600) {
			result = Math.floor(diff / 60) + ' minutes ago';
		} else if (diff >= 3600 && diff < 7200) {
			result = '1 hour ago';
		} else if (diff >= 7200 && diff < 86400) {
			result = Math.floor(diff / 3600) + ' hours ago';
		} else if (diff >= 86400 && diff < 172800) {
			result = '1 day ago';
		} else if (diff >= 172800) {
			result = Math.floor(diff / 86400) + 'days ago';
		}

		return result;
	}
});
