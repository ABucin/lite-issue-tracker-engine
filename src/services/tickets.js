app.service('TicketsService', ['$rootScope', '$http', 'ResourceService',

	function ($rootScope, $http, ResourceService) {

		this.addTicket = function (username, ticket, tickets, createdTickets) {
			var callback = function (data) {
				tickets.push(data);
				createdTickets.push(data);
			};
			ResourceService.postData('users/' + username + '/tickets', ticket, callback);
		};

		this.updateTicket = function (key, username, updatedTicket, tickets, createdTickets, inProgressTickets, testingTickets, doneTickets) {
			var callback = function (data) {
				for (var i in tickets) {
					if (tickets[i].key == data.key) {
						angular.copy(data, tickets[i]);
						$rootScope.$broadcast('ticketUpdated');
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
				case "in_progress":
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
			}

			ResourceService.putData('users/' + username + '/tickets/' + key, updatedTicket, callback);
		};

		this.deleteTicket = function (key, username, tickets, createdTickets, inProgressTickets, testingTickets, doneTickets) {
			var callback = function (data) {
				var deletedTicketStatus = "";

				for (var i in tickets) {
					if (tickets[i].key == key) {
						deletedTicketStatus = tickets[i].status;
						tickets.splice(i, 1);
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
				case "in_progress":
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
						for (var i in doneTickets) {
							if (doneTickets[i].key == key) {
								doneTickets.splice(i, 1);
								break;
							}
						}
						break;
					}
				default:
					{
						for (var i in doneTickets) {
							if (doneTickets[i].key == key) {
								doneTickets.splice(i, 1);;
								break;
							}
						}
					}
				}
			}
			ResourceService.deleteData('users/' + username + '/tickets/' + key, callback);
		};
}]);
