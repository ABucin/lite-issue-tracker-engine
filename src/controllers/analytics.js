app.controller('AnalyticsCtrl', ['$scope', '$rootScope', '$location', '$cookieStore', 'AnalyticsService',

function ($scope, $rootScope, $location, $cookieStore, AnalyticsService) {
		$scope.putSubPageName = function (name) {
			$cookieStore.put('analytics-subpage', {
				name: name
			});
		}

		$scope.fetchChartData = function (type) {
			$scope.putSubPageName(type);
			AnalyticsService.fetchChartData(type);
		};

		$scope.getSubPageName = function () {
			var subpage = $cookieStore.get('analytics-subpage');
			if (subpage !== undefined && subpage.name !== undefined) {
				return subpage.name;
			}

			return "loggedHours";
		}

		$scope.toggleActive = function (page) {
			return ($scope.getSubPageName() === page) ? 'active' : '';
		}

}]);
