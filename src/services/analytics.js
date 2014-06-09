app.service('AnalyticsService', ['ResourceService',
	function (ResourceService) {

		this.fetchChartData = function (type) {
			var callback = function (data) {
				$("#chart").highcharts(data);
			};
			var params = {
				type: type
			};
			ResourceService.getData('analytics', params, callback);
		};
}]);
