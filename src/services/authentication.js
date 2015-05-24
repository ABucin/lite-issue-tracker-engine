app.service('AuthenticationService', ['HttpService', function (HttpService) {

	/**
	 * Authenticates a user using the provided data.
	 * @param data user information that is sent to the backend and cached locally
	 */
	this.login = function (data) {
		return HttpService._post('auth/login', data);
	};

	/**
	 * De-authenticates a user both locally and in the backend.
	 */
	this.logout = function () {
		return HttpService._get('auth/logout');
	};

	/**
	 * Registers a user and displays the appropriate modals.
	 * @param data user information that is stored locally
	 */
	this.register = function (data) {
		return HttpService._post('auth/register', data);
	};
}]);
