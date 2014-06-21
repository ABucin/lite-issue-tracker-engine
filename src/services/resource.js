app.service('ResourceService', ['$rootScope', '$http',
	function ($rootScope, $http) {
		var pathRoot = '/itracker/api/';

		var resource = function (method, path, params, data, callback) {
			$http({
				method: method,
				url: pathRoot + path,
				params: params,
				data: data
			}).success(function (data) {
				callback(data);
			}).error(function (data, status) {
				if (status === 401) {
					$rootScope.general.errors = [{
						message: "Authentication failed. Invalid username or password."
					}];
				} else {
					$rootScope.general.errors = data;
				}
			});
		};

		this.getData = function (path, params, callback) {
			resource('GET', path, params, null, callback);
		};

		this.postData = function (path, data, callback) {
			resource('POST', path, null, data, callback);
		};

		this.putData = function (path, data, callback) {
			resource('PUT', path, null, data, callback);
		};

		this.deleteData = function (path, callback) {
			resource('DELETE', path, null, null, callback);
		};

}]);
