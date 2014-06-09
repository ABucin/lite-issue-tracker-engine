app.service('LogsService', ['ResourceService',
	function (ResourceService) {

		this.logData = function (username, log, response) {
			var callback = function (data) {
				response = data;
			};
			ResourceService.postData('users/' + username + '/logs', log, callback);
		};

		this.fetchLogData = function (logEntries) {
			var callback = function (data) {
				angular.copy(data, logEntries);
			};
			ResourceService.getData('logs', null, callback);
		};
}]);
