app.controller('TicketsCtrl', ['$scope', '$rootScope', '$location',
function ($scope, $rootScope, $location) {
		$rootScope.auth = true;
		$rootScope.canFilter = true;
		$rootScope.onAnalytics = false;
		$rootScope.createAction = "Create Ticket";
		$rootScope.deleteAction = "Delete Ticket";

		$scope.ownStatus = "";
		$scope.isEditing = false;

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
}]);
