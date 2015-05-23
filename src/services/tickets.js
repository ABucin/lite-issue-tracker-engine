app.service('TicketsService', ['$rootScope', 'HttpService',
	function ($rootScope, HttpService) {

		this.addTicket = function (userId, ticket, tickets, createdTickets, logger) {
			var callback = function (data) {
				tickets.push(data);
				createdTickets.push(data);
				logger("create", data);
			};
			HttpService.postData('users/' + userId + '/tickets', ticket, callback);
		};

		this.updateTicket = function (key, username, updatedTicket, tickets, createdTickets, inProgressTickets, testingTickets, doneTickets, loggedWork) {
			var callback = function (data) {
				for (var i in tickets) {
					if (tickets[i].key == data.key) {
						angular.copy(data, tickets[i]);
						$rootScope.$broadcast('ticketUpdated', {
							key: data.key
						});
						break;
					}
				}

				switch (data.status) {
				case "created":
					{
						for (var i in createdTickets) {
							if (createdTickets[i].key == data.key) {
								angular.copy(data, createdTickets[i]);
								break;
							}
						}
						break;
					}
				case "inProgress":
					{
						for (var i in inProgressTickets) {
							if (inProgressTickets[i].key == data.key) {
								angular.copy(data, inProgressTickets[i]);
								break;
							}
						}
						break;
					}
				case "testing":
					{
						for (var i in testingTickets) {
							if (testingTickets[i].key == data.key) {
								angular.copy(data, testingTickets[i]);
								break;
							}
						}
						break;
					}
				case "done":
					{
						for (var i in doneTickets) {
							if (doneTickets[i].key == data.key) {
								angular.copy(data, doneTickets[i]);
								break;
							}
						}
						break;
					}
				default:
					{
						for (var i in doneTickets) {
							if (doneTickets[i].key == data.key) {
								angular.copy(data, doneTickets[i]);
								break;
							}
						}
					}
				}
			};

			updatedTicket.loggedTime = loggedWork;

			HttpService.putData('tickets/' + key, updatedTicket, callback);
		};

		this.deleteTicket = function (key, username, tickets, createdTickets, inProgressTickets, testingTickets) {
			var callback = function () {
				var deletedTicketStatus = "";

				for (var i in tickets) {
					if (tickets[i].key == key) {
						deletedTicketStatus = tickets[i].status;
						tickets.splice(i, 1);
						$rootScope.$broadcast('ticketDeleted', {
							key: key
						});
						break;
					}
				}

				switch (deletedTicketStatus) {
				case "created":
					{
						for (var i in createdTickets) {
							if (createdTickets[i].key == key) {
								createdTickets.splice(i, 1);
								break;
							}
						}
						break;
					}
				case "inProgress":
					{
						for (var i in inProgressTickets) {
							if (inProgressTickets[i].key == key) {
								inProgressTickets.splice(i, 1);
								break;
							}
						}
						break;
					}
				case "testing":
					{
						for (var i in testingTickets) {
							if (testingTickets[i].key == key) {
								testingTickets.splice(i, 1);
								break;
							}
						}
						break;
					}
				case "done":
					{
						for (var i in $rootScope.tickets.done) {
							if ($rootScope.tickets.done[i].key == key) {
								$rootScope.tickets.done.splice(i, 1);
								break;
							}
						}
						break;
					}
				default:
					{
						for (var i in $rootScope.tickets.done) {
							if ($rootScope.tickets.done[i].key == key) {
								$rootScope.tickets.done.splice(i, 1);
								break;
							}
						}
					}
				}
			};
			HttpService.deleteData('tickets/' + key, callback);
		};
}]);
