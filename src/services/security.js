app.service('SecurityService', ['$cookies', function ($cookies) {
	/**
	 * Checks if the user is authenticated via the cookie store.
	 * @returns {boolean} true if the user is authenticated; false, otherwise
	 */
	this.isAuthenticated = function () {
		var user = $cookies.getObject('user');
		return user !== undefined && user.username !== undefined;
	};

	/**
	 * Retrieves the currently authenticated user via the cookie store.
	 * @returns {*} a user object
	 */
	this.getAuthenticatedUser = function () {
		return $cookies.getObject('user') || {};
	};
}]);