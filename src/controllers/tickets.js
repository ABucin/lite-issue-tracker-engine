app.controller('TicketsCtrl', ['$scope', '$rootScope', '$location', 'TicketsService', 'CommentsService',
function ($scope, $rootScope, $location, TicketsService, CommentsService) {
		$rootScope.auth = true;
		$rootScope.canFilter = true;
		$scope.isEditing = false;

		$rootScope.createAction = "Create Ticket";
		$rootScope.deleteAction = "Delete Ticket";
		$scope.status = {
			isEditingComment: false
		};
		$scope.ownComment = "";
		$scope.editedCommentKey = "";

		$scope.comments = [];

		$scope.updatedTicket = {};
		$scope.deletedTicket = {};

		$scope.loggedWork = {
			amount: 0.0
		};

		$scope.ticket = {
			title: "",
			description: "",
			type: "",
			estimatedTime: 0.0,
			loggedTime: 0.0,
			owner: $rootScope.username
		};

		$scope.comment = {
			key: "",
			author: $rootScope.username,
			content: ""
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

		$scope.addComment = function () {
			CommentsService.addComment($rootScope.username, $scope.updatedTicket.key, $scope.comment, $scope.comments);
		}

		$scope.deleteComment = function (commentKey) {
			CommentsService.deleteComment($rootScope.username, commentKey, $scope.comments, $scope.comment);
		}

		$scope.markForEdit = function (commentKey, commentContent) {
			$scope.status.isEditingComment = true;
			$scope.editedCommentKey = commentKey;
			$scope.comment.content = commentContent;
		};

		$scope.editComment = function () {
			CommentsService.editComment($rootScope.username, $scope.updatedTicket.key, $scope.editedCommentKey, $scope.comments, $scope.comment, $scope.status);
		}

		$scope.fetchComments = function (commentKey) {
			CommentsService.fetchComments(commentKey, $scope.comments);
		};

		$scope.addTicket = function () {
			TicketsService.addTicket($rootScope.username, $scope.ticket, $rootScope.tickets, $rootScope.createdTickets);
		};

		$scope.updateTicket = function () {
			TicketsService.updateTicket($scope.updatedTicket.key, $rootScope.username, $scope.updatedTicket, $rootScope.tickets, $rootScope.createdTickets, $rootScope.inProgressTickets, $rootScope.testingTickets, $rootScope.doneTickets, $scope.loggedWork.amount);
		};

		$scope.deleteTicket = function (key) {
			TicketsService.deleteTicket(key, $rootScope.username, $rootScope.tickets, $rootScope.createdTickets, $rootScope.inProgressTickets, $rootScope.testingTickets, $rootScope.doneTicket);
		};
}]);
