app.controller('SettingsCtrl', ['$scope', '$rootScope', '$location',
function ($scope, $rootScope, $location) {
		$rootScope.auth = true;
		$rootScope.onAnalytics = false;
		$rootScope.canFilter = false;

		$scope.settingsData = {};
		$scope.settingsTemplate = {};

		$scope.fetchSettingsData('profile');

		$scope.fetchSettingsData = function (type) {
			$scope.settingsTemplate.url = 'partials/snippets/settings/' + type + '.html';
			var params = {
				type: type
			};
			var callback = function (data) {
				$scope.settingsData = data;
			};
			$rootScope.getData('config', params, callback);
		};

}]);
