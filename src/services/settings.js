app.service('SettingsService', ['$rootScope', '$cookieStore', 'ResourceService',
	function ($rootScope, $cookieStore, ResourceService) {

		this.loadSettings = function () {
			var callback = function (data) {
				$cookieStore.put('settings', data[0]);
			};

			ResourceService.getData('users/' + $rootScope.getAuthenticatedUser().key + '/settings', null, callback);
		};

		this.getSettings = function () {
			return ($cookieStore.get('settings') !== undefined) ? $cookieStore.get('settings') : {};
		};

		this.setSettings = function (property, value) {
			var callback = function (data) {
				$cookieStore.remove('settings');
				$cookieStore.put('settings', data);
			};

			if ($cookieStore.get('settings') !== undefined) {
				var payload = $cookieStore.get('settings');
				payload[property] = value;
				ResourceService.putData('users/' + $rootScope.getAuthenticatedUser().key + '/settings/' + payload.key, payload, callback);
			} else {
				ResourceService.getData('users/' + $rootScope.getAuthenticatedUser().key + '/settings', null, callback);
			}
		};

		this.setGlobalSettings = function (property, value) {
			var callback = function (data) {
				$cookieStore.remove('settings');
				$cookieStore.put('settings', data);
			};

			if ($cookieStore.get('settings') !== undefined) {
				var payload = $cookieStore.get('settings');
				payload[property] = value;
				ResourceService.putData('settings', payload, callback);
			} else {
				ResourceService.getData('users/' + $rootScope.getAuthenticatedUser().key + '/settings', null, callback);
			}
		};
}]);
