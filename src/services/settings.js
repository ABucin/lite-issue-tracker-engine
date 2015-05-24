app.service('SettingsService', ['$cookies', 'HttpService',
	function ($cookies, HttpService) {

		this.loadSettings = function () {
			return HttpService._get('settings');
		};

		this.getSettings = function () {
			return $cookies.getObject('settings') || {};
		};

		this.setSettings = function (property, value, authUserKey) {
			var storedSettings = $cookies.getObject('settings');
			var outcome = HttpService._get('settings');

			if (storedSettings !== undefined) {
				storedSettings[property] = value;
				outcome = HttpService._put('users/' + authUserKey + '/settings/' + storedSettings.key, storedSettings);
			}

			return outcome;
		};

		this.setGlobalSettings = function (property, value, authUserKey) {
			var outcome = HttpService._get('users/' + authUserKey + '/settings');

			if ($cookies.getObject('settings') !== undefined) {
				var payload = $cookies.getObject('settings');
				payload[property] = value;
				outcome = HttpService._put('settings', payload);
			}

			return outcome;
		};
	}]);
