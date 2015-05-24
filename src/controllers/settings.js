app.controller('SettingsCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'SettingsService', 'UserService', 'ProjectsService', 'LogsService',
	function ($scope, $rootScope, $location, $cookies, SettingsService, UserService, ProjectsService, LogsService) {

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
			$scope.general.template.url = 'views/subviews/settings/' + type + '.html';
		};

		/**
		 * Retrieves settings from DB.
		 */
		$scope.loadSettings = function () {
			SettingsService.loadSettings()
				.then(function (response) {
					$cookies.putObject('settings', response[0]);
				});
		};

        $scope.loadLogData = function() {
	        LogsService.fetchLogData()
		        .then(function (response) {
			        angular.copy(response, $rootScope.dashboard.logEntries);
		        });
        };

        $scope.loadLogData();

		/**
		 * Sets the given property with the given value for the current user.
		 */
		$scope.setSettings = function (property, value) {
			SettingsService.setSettings(property, value, $rootScope.getAuthenticatedUser().key)
				.then(function (response) {
					$cookies.remove('settings');
					$cookies.putObject('settings', response);
				});
		};

		/**
		 * Sets the settings for all users.
		 */
		$scope.setGlobalSettings = function (property, value) {
			SettingsService.setGlobalSettings(property, value, $rootScope.getAuthenticatedUser().key)
				.then(function (response) {
					$cookies.remove('settings');
					$cookies.putObject('settings', response);
				});
		};

		var handleUpdateUser = function (response) {
			$rootScope.users = response;
			$rootScope.userTickets = [];
			$rootScope.tickets = {
				created: [],
				inProgress: [],
				testing: [],
				done: []
			};

			for (var i in response) {
				var tickets = $rootScope.users[i].tickets;

				for (var j in tickets) {
					var status = tickets[j].status;
					tickets[j].creator = $rootScope.users[i].username;
					$rootScope.userTickets.push(tickets[j]);
					$rootScope.tickets[status].push(tickets[j]);
				}
			}
		};
		/**
		 * Updates the user both in the cache as well as in the DB.
		 */
		$scope.updateUser = function () {
			if ($cookies.getObject('user') !== undefined) {
				var temp = $cookies.getObject('user');
				temp.firstName = $scope.editedUser.firstName;
				temp.lastName = $scope.editedUser.lastName;
				temp.email = $scope.editedUser.email;
				temp.expertise = $scope.editedUser.expertise;
				$cookies.putObject('user', temp);
			}

			UserService.updateUser($rootScope.getAuthenticatedUser().key, $scope.editedUser)
				.then(handleUpdateUser);
		};

		/**
		 * Updates the current project.
		 */
		$scope.updateProject = function () {
			ProjectsService.updateProject($scope.general.oldProject, $scope.general)
				.then(function (response) {
					var temp = $cookies.getObject('user');
					temp.project = response.project;
					$cookies.putObject('user', temp);
				});
		};

		/**
		 * Caches name of current subpage.
		 */
		$scope.subPageName = {
			put: function (name) {
				$cookies.putObject('settings-subpage', {
					name: name
				});
			},
			get: function () {
				var subpage = $cookies.getObject('settings-subpage');
				return subpage.name || "profile";
			}
		};

		/**
		 * Toggles the submenu for each subpage.
		 */
		$scope.toggleActive = function (page) {
			return ($scope.subPageName.get() === page) ? 'active' : '';
		}

}]);
