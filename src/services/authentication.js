app.service('AuthenticationService', ['ResourceService', 'UserService', 'SettingsService', '$rootScope', '$cookieStore', '$cookies',

	function (ResourceService, UserService, SettingsService, $rootScope, $cookieStore, $cookies) {

		this.isAuthenticated = function () {
			return $cookieStore.get('user') !== undefined && $cookieStore.get('user').username !== undefined;
		};

		this.getAuthenticatedUser = function () {
			return ($cookieStore.get('user') !== undefined) ? $cookieStore.get('user') : {};
		}

		this.login = function (data) {
			var callback = function (data) {
				if (!$rootScope.general.errors.length) {
					$cookieStore.put('user', data);
					// disable when user auth in place
					UserService.fetchUserData();
					// caches the settings for the current user
					SettingsService.loadSettings();
					$rootScope.navigate('dashboard');
				}
			};

			ResourceService.postData('users/login', data, callback);
		};

		this.logout = function () {
			var callback = function (data) {
				$cookieStore.remove('user');
				$cookieStore.remove('page');
				$cookieStore.remove('settings');
				$cookieStore.remove('analytics-subpage');
				$cookieStore.remove('settings-subpage');
				$rootScope.navigate('login');
			};

			ResourceService.getData('users/logout', null, callback);
		};

		this.register = function (data) {
			var callback = function (data) {
				if (!$rootScope.general.errors.length) {
					$cookieStore.put('user', data);
					$rootScope.general.errors = [];
					$("#register-modal").modal('hide');
					$('#register-success-modal').modal('show');
					// disable when user auth in place
					UserService.fetchUserData();
					// caches the settings for the current user
					SettingsService.loadSettings();
				}
			};

			ResourceService.postData('users/register', data, callback);
		};
}]);
