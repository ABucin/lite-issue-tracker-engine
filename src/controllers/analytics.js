app.controller('AnalyticsCtrl', ['$scope', '$rootScope', '$location', '$http', 'AnalyticsService',

function ($scope, $rootScope, $location, $http, AnalyticsService) {
		$rootScope.auth = true;
		$rootScope.canFilter = false;
		$rootScope.onAnalytics = true;

		$scope.fetchChartData = function (type, elementId) {
			AnalyticsService.fetchChartData(type, elementId);
		};

}]);
