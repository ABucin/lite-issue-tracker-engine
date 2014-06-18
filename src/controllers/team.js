app.controller('TeamCtrl', ['$scope', '$rootScope', '$location',
function ($scope, $rootScope, $location) {
		$rootScope.auth = true;
		$rootScope.hasDropdown = false;

		$scope.selectedTeamMember = $rootScope.currentUser;

		$scope.selectTeamMember = function (user) {
			angular.copy(user, $scope.selectedTeamMember);
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
					totalLoggedTime+=$rootScope.tickets[i].loggedTime;
					totalEstimatedTime+=$rootScope.tickets[i].estimatedTime;
				}
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
