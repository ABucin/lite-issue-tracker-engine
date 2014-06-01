app.controller('AnalyticsCtrl', ['$scope', '$rootScope', '$location', '$http',
function ($scope, $rootScope, $location, $http) {
		$rootScope.auth = true;
		$rootScope.canFilter = false;
		$rootScope.onAnalytics = true;
}]);
