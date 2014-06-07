app.controller('DashboardCtrl', ['$scope', '$rootScope', '$location', 'AnalyticsService',
function ($scope, $rootScope, $location, AnalyticsService) {
		$rootScope.canFilter = false;
		$rootScope.onAnalytics = false;
		$rootScope.auth = true;

		AnalyticsService.fetchChartData('assignedTickets', 'panel-workload');
}]);
