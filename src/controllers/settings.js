app.controller('SettingsCtrl', ['$scope', '$rootScope', '$location', '$cookieStore', 'SettingsService', 'UserService', 'ProjectsService', 'LogsService',
function ($scope, $rootScope, $location, $cookieStore, SettingsService, UserService, ProjectsService, LogsService) {

		/**
		 * General page configuration.
		 */
		$scope.general = {
			template: {},
			project: ($rootScope.getAuthenticatedUser().role == "admin") ? $rootScope.getAuthenticatedUser().project : null,
			oldProject: ($rootScope.getAuthenticatedUser().role == "admin") ? $rootScope.getAuthenticatedUser().project : null
		};

		/**
		 * Holds switches for the editable fields.
		 */
		$scope.edit = {
			firstName: false,
			lastName: false,
			email: false,
			expertise: false,
			project: false
		};

		/**
		 * Holds settings data for the current user.
		 */
		$scope.editedUser = {
			firstName: $rootScope.getAuthenticatedUser().firstName,
			lastName: $rootScope.getAuthenticatedUser().lastName,
			email: $rootScope.getAuthenticatedUser().email,
			expertise: $rootScope.getAuthenticatedUser().expertise
		};

		/**
		 * Retrieves the correct button icon based on whether it is toggled or not.
		 */
		$scope.computeToggle = function (property) {
			return (property === true) ? 'fa-check' : 'fa-times';
		};

		/**
		 * Retrieves the selected subpage and caches its name.
		 */
		$scope.fetchSettingsData = function (type) {
			$scope.subPageName.put(type);
			$scope.general.template.url = 'partials/snippets/settings/' + type + '.html';
		};

		/**
		 * Retrieves settings from DB.
		 */
		$scope.loadSettings = function () {
			SettingsService.loadSettings();
		};

        $scope.loadLogData = function() {
            LogsService.fetchLogData($rootScope.dashboard.logEntries);
        };

        $scope.loadLogData();

		/**
		 * Sets the given property with the given value for the current user.
		 */
		$scope.setSettings = function (property, value) {
			SettingsService.setSettings(property, value);
		};

		/**
		 * Sets the settings for all users.
		 */
		$scope.setGlobalSettings = function (property, value) {
			SettingsService.setGlobalSettings(property, value);
		};

		/**
		 * Updates the user both in the cache as well as in the DB.
		 */
		$scope.updateUser = function () {
			if ($cookieStore.get('user') !== undefined) {
				var temp = $cookieStore.get('user');
				temp.firstName = $scope.editedUser.firstName;
				temp.lastName = $scope.editedUser.lastName;
				temp.email = $scope.editedUser.email;
				temp.expertise = $scope.editedUser.expertise;
				$cookieStore.put('user', temp);
			}

			UserService.updateUser($rootScope.getAuthenticatedUser().key, $scope.editedUser);
		};

		/**
		 * Updates the current project.
		 */
		$scope.updateProject = function () {
			ProjectsService.updateProject($scope.general.oldProject, $scope.general);
		}

		/**
		 * Caches name of current subpage.
		 */
		$scope.subPageName = {
			put: function (name) {
				$cookieStore.put('settings-subpage', {
					name: name
				});
			},
			get: function () {
				var subpage = $cookieStore.get('settings-subpage');
				if (subpage !== undefined && subpage.name !== undefined) {
					return subpage.name;
				}

				return "profile";
			}
		};

		/**
		 * Toggles the submenu for each subpage.
		 */
		$scope.toggleActive = function (page) {
			return ($scope.subPageName.get() === page) ? 'active' : '';
		}

}]);
