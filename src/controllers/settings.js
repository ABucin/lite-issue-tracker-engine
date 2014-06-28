app.controller('SettingsCtrl', ['$scope', '$rootScope', '$location', '$cookieStore', 'SettingsService', 'UserService', 'ProjectsService',
function ($scope, $rootScope, $location, $cookieStore, SettingsService, UserService, ProjectsService) {
		$rootScope.hasDropdown = false;

		$scope.settingsTemplate = {};

		$scope.edit = {
			firstName: false,
			lastName: false,
			email: false,
			expertise: false,
			project: false
		};

		$scope.general = {
			project: ($rootScope.getAuthenticatedUser().role == "admin") ? $rootScope.getAuthenticatedUser().project : null,
			oldProject: ($rootScope.getAuthenticatedUser().role == "admin") ? $rootScope.getAuthenticatedUser().project : null
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
			$scope.putSubPageName(type);
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

		$scope.updateProject = function() {
			ProjectsService.updateProject($scope.general.oldProject, $scope.general);
		}

	$scope.putSubPageName = function (name) {
			$cookieStore.put('settings-subpage', {
				name: name
			});
		}

		$scope.getSubPageName = function () {
			var subpage = $cookieStore.get('settings-subpage');
			if (subpage !== undefined && subpage.name !== undefined) {
				return subpage.name;
			}

			return "profile";
		}

		$scope.toggleActive = function (page) {
			return ($scope.getSubPageName() === page) ? 'active' : '';
		}

}]);
