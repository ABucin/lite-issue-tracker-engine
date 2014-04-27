/**
 * Capitalizes a word.
 */
app.filter('capitalize', function () {
	return function (input) {
		return input.charAt(0).toUpperCase() + input.slice(1);
	};
});

app.filter('momentInTime', function () {
	return function (date) {
		var now = Date.now();
		var diff = Math.floor((now - Date.parse(date)) / 1000);
		var result = 'Just now';

		if (diff < 60) {
			result = diff + ' seconds ago';
		} else if (diff >= 60 && diff < 120) {
			result = '1 minute ago';
		} else if (diff >= 121 && diff < 3600) {
			result = Math.floor(diff / 60) + ' minutes ago';
		} else if (diff >= 3600) {
			result = Math.floor(diff / 3600) + ' hours ago';
		}

		return result;
	}
});
