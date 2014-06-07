app.controller('TicketsCtrl', ['$scope', '$rootScope', '$location', 'TicketsService',
function ($scope, $rootScope, $location, TicketsService) {
		$rootScope.auth = true;
		$rootScope.canFilter = true;
		$rootScope.createAction = "Create Ticket";
		$rootScope.deleteAction = "Delete Ticket";

		$scope.ownStatus = "";
		$scope.isEditing = false;

		$scope.updatedTicket = {};
		$scope.deletedTicket = {};

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
			TicketsService.addTicket($rootScope.username, $scope.ticket, $rootScope.tickets, $rootScope.createdTickets);
		};

		$scope.updateTicket = function () {
			TicketsService.updateTicket($scope.updatedTicket.key, $rootScope.username, $scope.updatedTicket, $rootScope.tickets, $rootScope.createdTickets, $rootScope.inProgressTickets, $rootScope.testingTickets, $rootScope.doneTickets);
		};

		$scope.deleteTicket = function (key) {
			TicketsService.deleteTicket(key, $rootScope.username, $rootScope.tickets, $rootScope.createdTickets, $rootScope.inProgressTickets, $rootScope.testingTickets, $rootScope.doneTicket);
		};
}]);
