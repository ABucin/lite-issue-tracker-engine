app.service('AnalyticsService', ['ResourceService',
	function (ResourceService) {

		this.fetchChartData = function (type, divId) {
			var id = (divId === undefined) ? "#chart" : divId;
			var callback = function (data) {
				$(id).highcharts(data);
			};
			var params = {
				type: type
			};
			ResourceService.getData('analytics', params, callback);
		};
}]);
