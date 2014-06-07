app.controller('AnalyticsCtrl', ['$scope', '$rootScope', '$location', '$http',
function ($scope, $rootScope, $location, $http) {
		$rootScope.auth = true;
		$rootScope.canFilter = false;
		$rootScope.onAnalytics = true;

		$scope.fetchChartData = function (type, elementId) {
			var id = (elementId == null) ? "#chart" : "#" + elementId;
			var callback = function (data) {
				$(id).highcharts(data);
			};
			var params = {
				type: type
			};
			$rootScope.getData('analytics', params, callback);
		};
}]);
