app.service('UserService', ['$rootScope', 'HttpService',
	function ($rootScope, HttpService) {

		this.getUser = function (userId, result) {
			var callback = function (data) {
				angular.copy(data[0], result);
			};

			HttpService.getData('users/' + userId, null, callback);
		};

		this.updateUser = function (userId, userData, users) {
			var self = this;
			var callback = function () {
				self.fetchUserData();
			};

			HttpService.putData('users/' + userId, userData, callback);
		};

		this.getUnassignedUsers = function (result) {
			var callback = function (data) {
				for (var i in data) {
					result.push(data[i]);
				}
			};

			HttpService.getData('users', {
				project: "unassigned"
			}, callback);
		};

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

					for (var j in tickets) {
						var status = tickets[j].status;
						tickets[j].creator = $rootScope.users[i].username;
						$rootScope.userTickets.push(tickets[j]);
						$rootScope.tickets[status].push(tickets[j]);
					}
				}
			};

			HttpService.getData('users', null, callback);
		};
	}]);
