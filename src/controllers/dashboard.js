app.controller('DashboardCtrl', ['$scope', '$rootScope', '$location', 'AnalyticsService', 'LogsService',
function ($scope, $rootScope, $location, AnalyticsService, LogsService) {
		$rootScope.hasDropdown = false;

		AnalyticsService.fetchChartData('assignedTickets');

		LogsService.fetchLogData($rootScope.dashboard.logEntries);

		$scope.computeDashboardPanelWidth = function (condition) {
			var width = 6;
			if (!condition) {
				width = 12;
			}
			return "col-lg-" + width + " col-md-" + width + " col-sm-" + width + " col-xs-" + width;
		};

}]);
