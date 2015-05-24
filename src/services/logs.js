app.service('LogsService', ['HttpService',
	function (HttpService) {

		this.logData = function (log) {
			return HttpService._post('logs', log);
		};

		this.fetchLogData = function () {
			return HttpService._get('logs');
		};
}]);
