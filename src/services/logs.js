app.service('LogsService', ['HttpService',
	function (HttpService) {

		this.logData = function (userId, log, logEntries) {
			var callback = function (data) {
				logEntries.push(data);
			};
			HttpService.postData('users/' + userId + '/logs', log, callback);
		};

		this.fetchLogData = function (logEntries) {
			var callback = function (data) {
				angular.copy(data, logEntries);
			};
			HttpService.getData('logs', null, callback);
		};
}]);
