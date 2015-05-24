app.service('HttpService', ['$http', '$base64', 'SecurityService', 'CONFIG',
	function ($http, $base64, SecurityService, CONFIG) {

		var pathRoot = CONFIG.address + ':' + CONFIG.port + CONFIG.api;

		var resource = function (method, path, params, data) {
			var authUser = SecurityService.getAuthenticatedUser();

			if (authUser)
				$http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(authUser.username + ':' + authUser.password);

			return $http({
				method: method,
				url: pathRoot + path,
				params: params,
				data: data
			}).then(function (response) {
				return response.data;
			}, function (response, status, headers, config, statusText) {
				var error = {
					message: statusText
				};

				if (status === 401) {
					error.message = "Authentication failed. Invalid username or password.";
				}

				return error;
			});
		};

		this._get = function (path, params) {
			return resource('GET', path, params);
		};

		this._post = function (path, data) {
			return resource('POST', path, null, data);
		};

		this._put = function (path, data) {
			return resource('PUT', path, null, data);
		};

		this._delete = function (path) {
			return resource('DELETE', path);
		};

	}]);
