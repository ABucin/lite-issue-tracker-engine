app.controller('TeamCtrl', ['$scope', '$rootScope', '$location', 'UserService', 'AuthenticationService',
function ($scope, $rootScope, $location, UserService, AuthenticationService) {
		$rootScope.hasDropdown = false;

		$scope.selectedTeamMember = {};

		$scope.selectTeamMember = function (username) {
			UserService.getUser(username, $scope.selectedTeamMember);
		}

		$scope.selectTeamMember(AuthenticationService.getAuthenticatedUser().username);

		$scope.modalTemplates = [{
			url: 'partials/modals/team/user_assign.html'
			}];

		$scope.templateUserAssignModal = $scope.modalTemplates[0];

		$scope.unassignedUser = {};
		$scope.unassignedUsers = [];

		$scope.getUnassignedUsers = function () {
			UserService.getUnassignedUsers($scope.unassignedUsers);
		}

		$scope.dismissUserAssignmentModal = function () {
			$rootScope.submitted = false;
			$rootScope.general.errors = [];
			$('#user-assignment-modal').modal('hide');
		}

		$scope.setProject = function (username, isValid) {
			$rootScope.submitted = true;
			$rootScope.general.errors = [];
			if (isValid) {
				$('#user-assignment-modal').modal('hide');
				UserService.updateUser(username, {
					project: $rootScope.project
				}, $rootScope.users);
			}
		}

		$scope.unsetProject = function (username, event) {
			event.preventDefault();
			event.stopPropagation();
			UserService.updateUser(username, {
				project: "unassigned"
			}, $rootScope.users);
		}

		$scope.getOpenTickets = function () {
			var openTickets = 0;
			for (var i in $rootScope.tickets) {
				if ($rootScope.tickets[i].owner === $scope.selectedTeamMember.username && $rootScope.tickets[i].status !== 'done') {
					openTickets++;
				}
			}
			return openTickets;
		}

		$scope.getEffortEstimationRatio = function () {
			var totalLoggedTime = 0.0;
			var totalEstimatedTime = 0.0;
			for (var i in $rootScope.tickets) {
				if ($rootScope.tickets[i].owner === $scope.selectedTeamMember.username) {
					totalLoggedTime += $rootScope.tickets[i].loggedTime;
					totalEstimatedTime += $rootScope.tickets[i].estimatedTime;
				}
			}
			if (totalLoggedTime === totalEstimatedTime === 0.0 || totalEstimatedTime === 0.0) {
				return 1;
			}
			return (totalLoggedTime / totalEstimatedTime).toFixed(2);
		}

		$scope.getRoleIcon = function (role) {
			var res = "";
			switch (role) {
			case "developer":
				{
					res = "terminal";
					break;
				}
			case "tester":
				{
					res = "bug";
					break;
				}
			default:
				{
					res = "bug";
					break;
				}
			}

			return res;
		}
}]);
