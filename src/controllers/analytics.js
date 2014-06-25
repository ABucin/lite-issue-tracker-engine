app.controller('AnalyticsCtrl', ['$scope', '$rootScope', '$location', '$cookieStore', 'AnalyticsService',

function ($scope, $rootScope, $location, $cookieStore, AnalyticsService) {
		$rootScope.hasDropdown = false;

		$scope.putSubPageName = function (name) {
			$cookieStore.put('analytics-subpage', {
				name: name
			});
		}

		$scope.fetchChartData = function (type, elementId) {
			$scope.putSubPageName(type);
			AnalyticsService.fetchChartData(type, elementId);
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
