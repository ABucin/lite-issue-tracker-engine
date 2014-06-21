app.service('AuthenticationService', ['ResourceService', '$rootScope', '$cookieStore', '$cookies',

	function (ResourceService, $rootScope, $cookieStore, $cookies) {

		this.isAuthenticated = function () {
			return $cookieStore.get('user') !== undefined && $cookieStore.get('user').username !== undefined;
		};

		this.getAuthenticatedUser = function () {
			return $cookieStore.get('user').username;
		}

		this.login = function (data) {
			var callback = function (data) {
				if (!$rootScope.general.errors.length) {
					$rootScope.general.errors = [];
					$rootScope.navigate('dashboard');
					$cookieStore.put('user', data);
				}
			};

			ResourceService.postData('login', data, callback);
		};

		this.logout = function () {
			var callback = function (data) {
				$cookieStore.remove('user');
				$rootScope.navigate('login');
			};

			ResourceService.getData('logout', null, callback);
		};

		this.register = function (data) {
			var callback = function (data) {
				if (!$rootScope.general.errors.length) {
					$cookieStore.put('user', data);
					$rootScope.general.errors = [];
					$("#register-modal").modal('hide');
					$('#register-success-modal').modal('show');
				}
			};

			ResourceService.postData('register', data, callback);
		};
}]);
