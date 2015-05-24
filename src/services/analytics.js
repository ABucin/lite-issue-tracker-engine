app.service('AnalyticsService', ['HttpService',
	function (HttpService) {

		/**
		 * Retrieves chart data and attaches it to the provided div.
		 * @param type what kind of chart to retrieve
		 * @param divId id of the div to which the chart will be attached
		 */
		this.fetchChartData = function (type, divId) {
			var id = divId || "#chart",
				params = {
					type: type
				};

			HttpService._get('analytics', params)
				.then(function (response) {
					$(id).highcharts(response);
				});
		};
	}]);
