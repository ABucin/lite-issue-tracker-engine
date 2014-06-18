app.controller('TicketsCtrl', ['$scope', '$rootScope', '$location', 'TicketsService', 'CommentsService', 'LogsService',
function ($scope, $rootScope, $location, TicketsService, CommentsService, LogsService) {
		$rootScope.auth = true;
		$rootScope.hasDropdown = true;
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

		$scope.markForEdit = function (commentKey, commentContent) {
			$scope.status.isEditingComment = true;
			$scope.editedCommentKey = commentKey;
			$scope.comment.content = commentContent;
		};

		$scope.filterTicket = function (owner) {
			if ($rootScope.filters.displayTickets === 'all') {
				return true;
			} else if ($rootScope.filters.displayTickets === 'mine') {
				return (owner === $rootScope.username);
			} else if ($rootScope.filters.displayTickets === 'unassigned') {
				return (owner === undefined || !owner.length);
			}
			return false;
		}

		/**
		 * Logs.
		 */
		$scope.logData = function (action, ticket) {
			var mappedAction = "";

			switch (action) {
			case "update":
				{
					mappedAction = "pencil";
					break;
				}
			case "create":
				{
					mappedAction = "plus";
					break;
				}
			case "comment":
				{
					mappedAction = "comment";
					break;
				}
			case "logTime":
				{
					mappedAction = "clock-o";
					break;
				}
			case "delete":
				{
					mappedAction = "times";
					break;
				}
			default:
				{
					mappedAction = "times";
					break;
				}
			}

			var log = {
				action: mappedAction,
				target: ticket.code,
				targetType: ticket.type,
				comment: $scope.comment.content,
				amount: $scope.loggedWork.amount,
				username: $rootScope.username
			};

			LogsService.logData($rootScope.username, log, $rootScope.dashboard.logEntries);
		};

		/*
		 * Comments.
		 */
		$scope.addComment = function () {
			CommentsService.addComment($rootScope.username, $scope.updatedTicket.key, $scope.comment, $scope.comments);
		}

		$scope.deleteComment = function (commentKey) {
			CommentsService.deleteComment($rootScope.username, commentKey, $scope.comments, $scope.comment);
		}

		$scope.editComment = function () {
			CommentsService.editComment($rootScope.username, $scope.updatedTicket.key, $scope.editedCommentKey, $scope.comments, $scope.comment, $scope.status);
		}

		$scope.fetchComments = function (commentKey) {
			CommentsService.fetchComments(commentKey, $scope.comments);
		};

		/**
		 * Tickets.
		 */
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
