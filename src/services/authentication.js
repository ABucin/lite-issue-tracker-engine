app.service('AuthenticationService', ['ResourceService', '$rootScope', '$cookieStore',

	function (ResourceService, $rootScope, $cookieStore) {

		this.isAuthenticated = function () {
			return $cookieStore.get('user') !== undefined;
		};

		this.getAuthenticatedUser = function () {
			return $cookieStore.get('user');
		}

		this.login = function (data) {
			var callback = function (data) {
				if (!$rootScope.general.errors.length) {
					$rootScope.general.errors = [];
					$rootScope.navigate('dashboard');
					$cookieStore.put('user', data.username);
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
					$cookieStore.put('user', data.username);
					$rootScope.general.errors = [];
					$("#register-modal").modal('hide');
					$('#register-success-modal').modal('show');
				}
			};

			ResourceService.postData('register', data, callback);
		};
}]);
