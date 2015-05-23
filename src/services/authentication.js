app.service('AuthenticationService', ['HttpService', 'UserService', 'SettingsService', '$rootScope', '$cookies',

	function (HttpService, UserService, SettingsService, $rootScope, $cookies) {

		/**
		 * Authenticates a user using the provided data.
		 * @param data user information that is sent to the backend and cached locally
		 */
		this.login = function (data) {
			var callback = function (response) {
				if (!$rootScope.general.errors.length) {
					response.password = data.password;
					$cookies.putObject('user', response);
					// disable when user auth in place
					UserService.fetchUserData();
					// caches the settings for the current user
					SettingsService.loadSettings();
					$rootScope.navigate('dashboard');
				}
			};

			HttpService.postData('auth/login', data, callback);
		};

		/**
		 * De-authenticates a user both locally and in the backend.
		 */
		this.logout = function () {
			var callback = function () {
				$cookies.remove('user');
				$cookies.remove('page');
				$cookies.remove('settings');
				$cookies.remove('analytics-subpage');
				$cookies.remove('settings-subpage');
				$rootScope.navigate('login');
			};

			HttpService.getData('auth/logout', null, callback);
		};

		/**
		 * Registers a user and displays the appropriate modals.
		 * @param data user information that is stored locally
		 */
		this.register = function (data) {
			var callback = function (data) {
				if (!$rootScope.general.errors.length) {
					$cookies.putObject('user', data);
					$rootScope.general.errors = [];
					$("#register-modal").modal('hide');
					$('#register-success-modal').modal('show');
					// disable when user auth in place
					UserService.fetchUserData();
					// caches the settings for the current user
					SettingsService.loadSettings();
				}
			};

			HttpService.postData('auth/register', data, callback);
		};
	}]);
