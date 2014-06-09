app.controller('DashboardCtrl', ['$scope', '$rootScope', '$location', 'AnalyticsService', 'LogsService',
function ($scope, $rootScope, $location, AnalyticsService, LogsService) {
		$rootScope.canFilter = false;
		$rootScope.auth = true;
		$scope.dashboard = {
			logEntries: []
		};

		AnalyticsService.fetchChartData('assignedTickets');

		LogsService.fetchLogData($scope.dashboard.logEntries);

}]);
