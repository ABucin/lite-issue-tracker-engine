app.service('UserService', ['$rootScope', '$cookieStore', 'ResourceService',
	function ($rootScope, $cookieStore, ResourceService) {

		this.getUser = function (username, result) {
			var callback = function (data) {
				angular.copy(data[0], result);
			};

			ResourceService.getData('users/' + username, null, callback);
		};

		this.updateUser = function (username, userData, users) {
			var self = this;
			var callback = function (data) {
				//				for (var i in users) {
				//					if (users[i].username === username) {
				//						//angular.copy(data, users[i]);
				//						users.push(data);
				//					}
				//				}
				self.fetchUserData();
			};

			ResourceService.putData('users/' + username, userData, callback);
		};

		this.getUnassignedUsers = function (result) {
			var callback = function (data) {
				for (var i in data) {
					result.push(data[i]);
				}
			};

			ResourceService.getData('users', {
				project: "unassigned"
			}, callback);
		}

		this.fetchUserData = function () {
			var callback = function (data) {
				$rootScope.users = data;
				$rootScope.userTickets = [];
				$rootScope.tickets = {
					created: [],
					inProgress: [],
					testing: [],
					done: []
				};

				for (var i in data) {
					var tickets = $rootScope.users[i].tickets;
					var logs = $rootScope.users[i].logs;

					for (var j in tickets) {
						var status = tickets[j].status;
						tickets[j].creator = $rootScope.users[i].username;
						$rootScope.userTickets.push(tickets[j]);
						$rootScope.tickets[status].push(tickets[j]);
					}
				}
			}

			ResourceService.getData('users', null, callback);
		};
}]);
