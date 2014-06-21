app.controller('SettingsCtrl', ['$scope', '$rootScope', '$location', 'ResourceService',
function ($scope, $rootScope, $location, ResourceService) {
		$rootScope.hasDropdown = false;

		$scope.settingsTemplate = {};

		$scope.settings = {
			displayUserActivity: false,
			displayUserChart: false,
			displayUserRole: false,
			displayUserEmail: false
		};

		$scope.computeToggle = function (property) {
			return (property === true) ? 'fa-check' : 'fa-times';
		}

		$scope.fetchSettingsData = function (type) {
			$scope.settingsTemplate.url = 'partials/snippets/settings/' + type + '.html';
			var callback = function (data) {
				$scope.settings = data[0];
			};
			ResourceService.getData('users/' + $rootScope.getAuthenticatedUser() + '/settings', null, callback);
		};

}]);
