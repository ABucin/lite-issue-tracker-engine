app.controller('AnalyticsCtrl', ['$scope', '$rootScope', '$location', 'AnalyticsService',

function ($scope, $rootScope, $location, AnalyticsService) {
		$rootScope.auth = true;
		$rootScope.hasDropdown = false;

		$scope.fetchChartData = function (type, elementId) {
			AnalyticsService.fetchChartData(type, elementId);
		};

}]);
