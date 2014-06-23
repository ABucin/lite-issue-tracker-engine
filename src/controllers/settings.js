app.controller('SettingsCtrl', ['$scope', '$rootScope', '$location', '$cookieStore', 'SettingsService', 'UserService',
function ($scope, $rootScope, $location, $cookieStore, SettingsService, UserService) {
		$rootScope.hasDropdown = false;

		$scope.settingsTemplate = {};

		$scope.edit = {
			firstName: false,
			lastName: false,
			email: false,
			expertise: false
		};

		$scope.editedUser = {
			firstName: $rootScope.getAuthenticatedUser().firstName,
			lastName: $rootScope.getAuthenticatedUser().lastName,
			email: $rootScope.getAuthenticatedUser().email,
			expertise: $rootScope.getAuthenticatedUser().expertise
		};

		$scope.computeToggle = function (property) {
			return (property === true) ? 'fa-check' : 'fa-times';
		};

		$scope.fetchSettingsData = function (type) {
			$scope.settingsTemplate.url = 'partials/snippets/settings/' + type + '.html';
		};

		$scope.loadSettings = function () {
			SettingsService.loadSettings();
		};

		$scope.setSettings = function (property, value) {
			SettingsService.setSettings(property, value);
		};

		$scope.setGlobalSettings = function (property, value) {
			SettingsService.setGlobalSettings(property, value);
		};

		$scope.updateUser = function () {
			if ($cookieStore.get('user') !== undefined) {
				var temp = $cookieStore.get('user');
				temp.firstName = $scope.editedUser.firstName;
				temp.lastName = $scope.editedUser.lastName;
				temp.email = $scope.editedUser.email;
				temp.expertise = $scope.editedUser.expertise;
				$cookieStore.put('user', temp);
			}

			UserService.updateUser($rootScope.getAuthenticatedUser().username, $scope.editedUser);
		};

}]);
