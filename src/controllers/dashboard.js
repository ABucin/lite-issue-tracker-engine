app.controller('DashboardCtrl', ['$scope', '$rootScope', '$location', 'AnalyticsService', 'LogsService',
function ($scope, $rootScope, $location, AnalyticsService, LogsService) {
		$rootScope.hasDropdown = false;
		$rootScope.auth = true;

		AnalyticsService.fetchChartData('assignedTickets');

		LogsService.fetchLogData($rootScope.dashboard.logEntries);

}]);
