app.service('UserService', ['$rootScope', 'ResourceService',
	function ($rootScope, ResourceService) {
		this.registerUser = function (data) {
			var callback = function (data) {
				$rootScope.errors = [];
				$("#register-modal").modal('hide');
				$('#register-success-modal').modal('show');
			};

			ResourceService.postData('users', data, callback);
		};

		this.fetchUserData = function () {
			var callback = function (data) {
				$rootScope.users = data;
				$rootScope.workloadData = [];
				$rootScope.tickets = [];
				$rootScope.logEntries = [];

				for (var i in data) {
					$rootScope.workloadData.push([data[i].username, data[i].tickets.length]);

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

					for (var j in logs) {
						logs[j].username = $rootScope.users[i].username;
						$rootScope.logEntries.push(logs[j]);
					}
				}
			}

			ResourceService.getData('users', null, callback);
		};
}]);
