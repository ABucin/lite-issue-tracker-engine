app.controller('TicketsCtrl', ['$scope', '$rootScope', '$location', 'ResourceService',
function ($scope, $rootScope, $location, ResourceService) {
		$rootScope.auth = true;
		$rootScope.canFilter = true;
		$rootScope.createAction = "Create Ticket";
		$rootScope.deleteAction = "Delete Ticket";

		$scope.ownStatus = "";
		$scope.isEditing = false;

		$scope.updatedTicket = {};
		$scope.ticket = {
			title: "",
			description: "",
			type: "",
			estimatedTime: 0,
			loggedTime: 0,
			owner: $rootScope.username
		};

		$scope.templates = [{
				url: 'partials/modals/tickets/ticket_create.html'
			},
			{
				url: 'partials/modals/tickets/ticket_edit.html'
			},
			{
				url: 'partials/modals/tickets/ticket_delete.html'
			}];

		$scope.templateCreate = $scope.templates[0];
		$scope.templateEdit = $scope.templates[1];
		$scope.templateDelete = $scope.templates[2];

		$scope.addTicket = function () {
			var callback = function (data) {
				$rootScope.tickets.push(data);
				$rootScope.createdTickets.push(data);
			};
			ResourceService.postData('users/' + $rootScope.username + '/tickets', $scope.ticket, callback);
		};

		$scope.updateTicket = function () {
			var callback = function (data) {
				for (var i in $rootScope.tickets) {
					if ($rootScope.tickets[i].key == data.key) {
						angular.copy(data, $rootScope.tickets[i]);
						break;
					}
				}

				switch (data.status) {
				case "created":
					{
						for (var i in $rootScope.createdTickets) {
							if ($rootScope.createdTickets[i].key == data.key) {
								angular.copy(data, $rootScope.createdTickets[i]);
								break;
							}
						}
						break;
					}
				case "in_progress":
					{
						for (var i in $rootScope.inProgressTickets) {
							if ($rootScope.inProgressTickets[i].key == data.key) {
								angular.copy(data, $rootScope.inProgressTickets[i]);
								break;
							}
						}
						break;
					}
				case "testing":
					{
						for (var i in $rootScope.testingTickets) {
							if ($rootScope.testingTickets[i].key == data.key) {
								angular.copy(data, $rootScope.testingTickets[i]);
								break;
							}
						}
						break;
					}
				case "done":
					{
						for (var i in $rootScope.doneTickets) {
							if ($rootScope.doneTickets[i].key == data.key) {
								angular.copy(data, $rootScope.doneTickets[i]);
								break;
							}
						}
						break;
					}
				default:
					{
						for (var i in $rootScope.doneTickets) {
							if ($rootScope.doneTickets[i].key == data.key) {
								angular.copy(data, $rootScope.doneTickets[i]);
								break;
							}
						}
					}
				}
			}

			ResourceService.putData('users/' + $rootScope.username + '/tickets/' + data.key, $scope.updatedTicket, callback);
		};

		$scope.deleteTicket = function (key) {
			var callback = function (data) {
				var deletedTicketStatus = "";

				for (var i in $rootScope.tickets) {
					if ($rootScope.tickets[i].key == key) {
						deletedTicketStatus = $rootScope.tickets[i].status;
						$rootScope.tickets.splice(i, 1);
						break;
					}
				}

				switch (deletedTicketStatus) {
				case "created":
					{
						for (var i in $rootScope.createdTickets) {
							if ($rootScope.createdTickets[i].key == key) {
								$rootScope.createdTickets.splice(i, 1);
								break;
							}
						}
						break;
					}
				case "in_progress":
					{
						for (var i in $rootScope.inProgressTickets) {
							if ($rootScope.inProgressTickets[i].key == key) {
								$rootScope.inProgressTickets.splice(i, 1);
								break;
							}
						}
						break;
					}
				case "testing":
					{
						for (var i in $rootScope.testingTickets) {
							if ($rootScope.testingTickets[i].key == key) {
								$rootScope.testingTickets.splice(i, 1);
								break;
							}
						}
						break;
					}
				case "done":
					{
						for (var i in $rootScope.doneTickets) {
							if ($rootScope.doneTickets[i].key == key) {
								$rootScope.doneTickets.splice(i, 1);
								break;
							}
						}
						break;
					}
				default:
					{
						for (var i in $rootScope.doneTickets) {
							if ($rootScope.doneTickets[i].key == key) {
								$rootScope.doneTickets.splice(i, 1);;
								break;
							}
						}
					}
				}
			}
			ResourceService.deleteData('users/' + $rootScope.username + '/tickets/' + key, callback);
		};
}]);
