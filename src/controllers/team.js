app.controller('TeamCtrl', ['$scope', '$rootScope', '$location', 'UserService', 'AuthenticationService',
function ($scope, $rootScope, $location, UserService, AuthenticationService) {
		$scope.selectedTeamMember = {};
		$scope.unassignedUser = {};
		$scope.unassignedUsers = [];

		$scope.modalTemplates = [{
			url: 'views/modals/team/user-assign.html'
			}];

		$scope.templateUserAssignModal = $scope.modalTemplates[0];

		/**
		 * General page configuration.
		 */
		$scope.general = {
			roleIcon: {
				developer: "terminal",
				tester: "bug"
			}
		};

		/**
		 * Document loading configuration.
		 */
		angular.element(document).ready(function () {
			$scope.selectTeamMember(AuthenticationService.getAuthenticatedUser().key);
		});

		/**
		 * Selects a team member.
		 */
		$scope.selectTeamMember = function (userId) {
			UserService.getUser(userId, $scope.selectedTeamMember);
		};

		/**
		 * Retrieves the users that are unassigned to any project.
		 */
		$scope.getUnassignedUsers = function () {
			$scope.unassignedUsers = [];
			UserService.getUnassignedUsers($scope.unassignedUsers);
		};

		/**
		 * Dismissses the modal responsible for user assignment to projects.
		 */
		$scope.dismissUserAssignmentModal = function () {
			$rootScope.submitted = false;
			$rootScope.general.errors = [];
			$('#user-assignment-modal').modal('hide');
		};

		/**
		 * Various project functions.
		 */
		$scope.project = {
			set: function (username, isValid) {
				$rootScope.submitted = true;
				$rootScope.general.errors = [];
				if (isValid) {
					$('#user-assignment-modal').modal('hide');
					UserService.updateUser(username, {
						project: $rootScope.project
					}, $rootScope.users);
				}
			},
			unset: function (username, event) {
				event.preventDefault();
				event.stopPropagation();
				UserService.updateUser(username, {
					project: "unassigned"
				}, $rootScope.users);
			}
		};

		/**
		 * Computes number of open tickets for selected user.
		 */
		$scope.getOpenTickets = function () {
			var openTickets = 0;
			for (var i in $rootScope.userTickets) {
				if ($rootScope.userTickets[i].owner === $scope.selectedTeamMember.username && $rootScope.userTickets[i].status !== 'done') {
					openTickets++;
				}
			}
			return openTickets;
		};

		/**
		 * Computes effort-estimation ratio for selected user.
		 */
		$scope.getEffortEstimationRatio = function () {
			var totalLoggedTime = 0.0,
				totalEstimatedTime = 0.0;
			for (var i in $rootScope.userTickets) {
				if ($rootScope.userTickets[i].owner === $scope.selectedTeamMember.username) {
					totalLoggedTime += $rootScope.userTickets[i].loggedTime;
					totalEstimatedTime += $rootScope.userTickets[i].estimatedTime;
				}
			}
			if (totalLoggedTime === totalEstimatedTime || totalEstimatedTime === 0.0) {
				return 1;
			}
			return (totalLoggedTime / totalEstimatedTime).toFixed(2);
		};

}]);
