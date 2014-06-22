app.controller('SettingsCtrl', ['$scope', '$rootScope', '$location', 'SettingsService',
function ($scope, $rootScope, $location, SettingsService) {
		$rootScope.hasDropdown = false;

		$scope.settingsTemplate = {};

		$scope.computeToggle = function (property) {
			return (property === true) ? 'fa-check' : 'fa-times';
		};

		$scope.fetchSettingsData = function (type) {
			$scope.settingsTemplate.url = 'partials/snippets/settings/' + type + '.html';
		};

		$scope.loadSettings = function () {
			SettingsService.loadSettings();
		};

		$scope.setSettings = function(property, value) {
			SettingsService.setSettings(property, value);
		};

}]);
