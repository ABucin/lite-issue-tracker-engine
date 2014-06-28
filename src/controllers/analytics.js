app.controller('AnalyticsCtrl', ['$scope', '$rootScope', '$location', '$cookieStore', 'AnalyticsService',

function ($scope, $rootScope, $location, $cookieStore, AnalyticsService) {

		/**
		 * Caches name of current subpage.
		 */
		$scope.subPageName = {
			put: function (name) {
				$cookieStore.put('analytics-subpage', {
					name: name
				});
			},
			get: function () {
				var subpage = $cookieStore.get('analytics-subpage');
				if (subpage !== undefined && subpage.name !== undefined) {
					return subpage.name;
				}

				return "loggedHours";
			}
		};

		/**
		 * Retrieves the data for the provided chart type.
		 */
		$scope.fetchChartData = function (type) {
			$scope.subPageName.put(type);
			AnalyticsService.fetchChartData(type);
		};

		/**
		 * Toggles the submenu for each subpage.
		 */
		$scope.toggleActive = function (page) {
			return ($scope.subPageName.get() === page) ? 'active' : '';
		};

}]);
