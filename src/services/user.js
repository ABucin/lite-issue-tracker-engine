app.service('UserService', ['HttpService',
	function (HttpService) {

		this.getUser = function (userId) {
			return HttpService._get('users/' + userId);
		};

		this.updateUser = function (userId, userData) {
			return HttpService._put('users/' + userId, userData)
				.then(function () {
					var self = this;
					return self.fetchUserData();
				})
		};

		this.getUnassignedUsers = function () {
			return HttpService._get('users', {
				project: "unassigned"
			});
		};

		this.fetchUserData = function () {
			return HttpService._get('users');
		};
	}]);
