app.controller('SettingsCtrl', ['$scope', '$rootScope', '$location', 'ResourceService',
function ($scope, $rootScope, $location, ResourceService) {
		$rootScope.auth = true;
		$rootScope.onAnalytics = false;
		$rootScope.canFilter = false;

		$scope.settingsData = {};
		$scope.settingsTemplate = {};

		$scope.fetchSettingsData = function (type) {
			$scope.settingsTemplate.url = 'partials/snippets/settings/' + type + '.html';
			var params = {
				type: type
			};
			var callback = function (data) {
				$scope.settingsData = data;
			};
			ResourceService.getData('config', params, callback);
		};

}]);
