app.service('TicketsService', ['HttpService',
	function (HttpService) {

		this.addTicket = function (userId, ticket) {
			return HttpService._post('users/' + userId + '/tickets', ticket);
		};

		this.updateTicket = function (key, updatedTicket, loggedWork) {
			updatedTicket.loggedTime = loggedWork;

			return HttpService._put('tickets/' + key, updatedTicket);
		};

		this.deleteTicket = function (key) {
			return HttpService._delete('tickets/' + key);
		};
}]);
