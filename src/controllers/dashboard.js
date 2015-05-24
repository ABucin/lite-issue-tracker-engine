app.controller('DashboardCtrl', ['$scope', '$rootScope', '$location', 'AnalyticsService', 'LogsService',
	function ($scope, $rootScope, $location, AnalyticsService, LogsService) {

		/**
		 * Document loading configuration.
		 */
		angular.element(document).ready(function () {
			AnalyticsService.fetchChartData('loggedHours', '#chartLoggedHours');
			AnalyticsService.fetchChartData('effortEstimation', '#chartEffortEstimation');
			LogsService.fetchLogData()
				.then(function (response) {
					angular.copy(response, $rootScope.dashboard.logEntries);
				});
		});

		/**
		 * General dashboard configuration.
		 */
		$scope.general = {
			computeWidth: function (condition) {
				var width = 6;
				if (!condition) {
					width = 12;
				}
				return "col-lg-" + width + " col-md-" + width + " col-sm-" + width + " col-xs-" + width;
			}
		};

	}]);
