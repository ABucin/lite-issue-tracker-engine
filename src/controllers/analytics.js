app.controller('AnalyticsCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'AnalyticsService',

	function ($scope, $rootScope, $location, $cookies, AnalyticsService) {

		/**
		 * Caches name of current subpage.
		 */
		$scope.subPageName = {
			put: function (name) {
				$cookies.putObject('analytics-subpage', {
					name: name
				});
			},
			get: function () {
				var subpage = $cookies.getObject('analytics-subpage');
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
