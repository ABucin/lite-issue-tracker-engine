app.service('SettingsService', ['$rootScope', '$cookies', 'HttpService',
	function ($rootScope, $cookies, HttpService) {

		this.loadSettings = function () {
			var callback = function (data) {
				$cookies.putObject('settings', data[0]);
			};

			HttpService.getData('/settings', null, callback);
		};

		this.getSettings = function () {
			return $cookies.getObject('settings') || {};
		};

		this.setSettings = function (property, value) {
			var callback = function (data) {
				$cookies.remove('settings');
				$cookies.putObject('settings', data);
			};

			var storedSettings = $cookies.getObject('settings');

			if (storedSettings !== undefined) {
				storedSettings[property] = value;
				HttpService.putData('users/' + $rootScope.getAuthenticatedUser().key + '/settings/' + storedSettings.key, storedSettings, callback);
			} else {
				HttpService.getData('/settings', null, callback);
			}
		};

		this.setGlobalSettings = function (property, value) {
			var callback = function (data) {
				$cookies.remove('settings');
				$cookies.putObject('settings', data);
			};

			if ($cookies.getObject('settings') !== undefined) {
				var payload = $cookies.getObject('settings');
				payload[property] = value;
				HttpService.putData('settings', payload, callback);
			} else {
				HttpService.getData('users/' + $rootScope.getAuthenticatedUser().key + '/settings', null, callback);
			}
		};
}]);
