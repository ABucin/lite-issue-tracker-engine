app.service('AnalyticsService', ['ResourceService',
	function (ResourceService) {
		this.fetchChartData = function (type, elementId) {
			var id = (elementId == null) ? "#chart" : "#" + elementId;
			var callback = function (data) {
				$(id).highcharts(data);
			};
			var params = {
				type: type
			};
			ResourceService.getData('analytics', params, callback);
		};
}]);
