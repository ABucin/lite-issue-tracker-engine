app.service('UserService', ['$rootScope', 'ResourceService',
	function ($rootScope, ResourceService) {

		this.getUser = function (username, result) {
			var callback = function (data) {
				angular.copy(data[0], result);
			};

			ResourceService.getData('users/' + username, null, callback);
		};

		this.getUnassignedUsers = function (result) {
			var callback = function (data) {
				for(var i in data){
					result.push(data[i]);
				}
//				angular.copy(data, result);
			};

			ResourceService.getData('users', {
				project: "unassigned"
			}, callback);
		}

		this.fetchUserData = function () {
			var callback = function (data) {
				$rootScope.users = data;
				$rootScope.workloadData = [];
				$rootScope.tickets = [];

				for (var i in data) {
					$rootScope.workloadData.push([data[i].username, data[i].tickets.length]);
					if (data[i].username === $rootScope.getAuthenticatedUser().username) {
						angular.copy(data[i], $rootScope.currentUser);
					}

					var tickets = $rootScope.users[i].tickets;
					var logs = $rootScope.users[i].logs;

					for (var j in tickets) {
						tickets[j].creator = $rootScope.users[i].username;
						$rootScope.tickets.push(tickets[j]);
						switch (tickets[j].status) {
						case "created":
							{
								$rootScope.createdTickets.push(tickets[j]);
								break;
							}
						case "in_progress":
							{
								$rootScope.inProgressTickets.push(tickets[j]);
								break;
							}
						case "testing":
							{
								$rootScope.testingTickets.push(tickets[j]);
								break;
							}
						case "done":
							{
								$rootScope.doneTickets.push(tickets[j]);
								break;
							}
						default:
							{
								$rootScope.doneTickets.push(tickets[j]);
							}
						}
					}
				}
			}

			ResourceService.getData('users', null, callback);
		};
}]);
