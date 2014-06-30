app.controller('TicketsCtrl', ['$scope', '$rootScope', '$location', 'TicketsService', 'CommentsService', 'LogsService', 'UserService',
function ($scope, $rootScope, $location, TicketsService, CommentsService, LogsService, UserService) {
		$rootScope.menu.hasDropdown = true;
		$scope.isEditing = false;

		$scope.status = {
			isEditingComment: false
		};
		$scope.ownComment = "";
		$scope.editedCommentKey = "";

		$scope.comments = [];

		$scope.updatedTicket = {};
		$scope.deletedTicket = {};
		$scope.copiedTicket = {};

		$scope.loggedWork = {
			amount: 0.0
		};

		angular.element(document).ready(function () {
			UserService.fetchUserData();
		});

		$scope.ticket = {
			title: null,
			description: null,
			type: "task",
			priority: "major",
			estimatedTime: 0.0,
			loggedTime: 0.0,
			owner: $rootScope.getAuthenticatedUser().username,
			user: $rootScope.getAuthenticatedUser().username
		};

		$scope.comment = {
			key: "",
			author: $rootScope.getAuthenticatedUser().username,
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
			if ($rootScope.menu.filters.displayTickets === 'all') {
				return true;
			} else if ($rootScope.menu.filters.displayTickets === 'mine') {
				return (owner === $rootScope.getAuthenticatedUser().username);
			} else if ($rootScope.menu.filters.displayTickets === 'unassigned') {
				return (owner === undefined || !owner.length);
			}
			return false;
		}

		$scope.general = {
			log: {
				update: "pencil",
				create: "plus",
				comment: "comment",
				logTime: "clock-o",
				delete: "times"
			}
		};

		/**
		 * Logs.
		 */
		$scope.logData = function (action, ticket) {
			var log = {
				action: $scope.general.log[action],
				target: ticket.code,
				targetType: ticket.type,
				comment: $scope.comment.content,
				amount: $scope.loggedWork.amount,
				username: $rootScope.getAuthenticatedUser().username
			};

			LogsService.logData($rootScope.getAuthenticatedUser().username, log, $rootScope.dashboard.logEntries);
		};

		/*
		 * Comments.
		 */
		$scope.addComment = function (isValid) {
			if (isValid) {
				CommentsService.addComment($rootScope.getAuthenticatedUser().username, $scope.updatedTicket.key, $scope.comment, $scope.comments);
			}
		}

		$scope.deleteComment = function (commentKey) {
			CommentsService.deleteComment($rootScope.getAuthenticatedUser().username, commentKey, $scope.comments, $scope.comment);
		}

		$scope.editComment = function (isValid) {
			$rootScope.submitted = true;
			$rootScope.general.errors = [];
			if (isValid) {
				$rootScope.submitted = false;
				$rootScope.general.errors = [];
				CommentsService.editComment($rootScope.getAuthenticatedUser().username, $scope.updatedTicket.key, $scope.editedCommentKey, $scope.comments, $scope.comment, $scope.status);
			}
		}

		$scope.fetchComments = function (commentKey) {
			CommentsService.fetchComments(commentKey, $scope.comments);
		};

		/**
		 * Tickets.
		 */
		$scope.addTicket = function (isValid) {
			$rootScope.tickets.isDeleting = false;
			$rootScope.submitted = true;
			$rootScope.general.errors = [];
			if (isValid) {
				$rootScope.general.errors = [];
				$('#ticket-creation-modal').modal('hide');
				$rootScope.submitted = false;
				TicketsService.addTicket($rootScope.getAuthenticatedUser().username, $scope.ticket, $rootScope.userTickets, $rootScope.tickets.created, $scope.logData);
			}
		};

		$scope.hideTicketCreationModal = function () {
			$rootScope.general.errors = [];
			$('#ticket-creation-modal').modal('hide');
		};

		$rootScope.showTicketCreationModal = function () {
			$rootScope.general.errors = [];
			$scope.ticket = {
				title: null,
				description: null,
				type: "task",
				priority: "major",
				estimatedTime: 0.0,
				loggedTime: 0.0,
				owner: $rootScope.getAuthenticatedUser().username,
				user: $rootScope.getAuthenticatedUser().username
			};
			$('#ticket-creation-modal').modal('show');
		};

		$scope.hideTicketPreviewModal = function () {
			$rootScope.general.errors = [];
			$('#ticket-preview-modal').modal('hide');
		};

		$scope.updateTicket = function (isValid) {
			$rootScope.tickets.isDeleting = false;
			$rootScope.submitted = true;
			$rootScope.general.errors = [];
			if (isValid) {
				$rootScope.general.errors = [];
				$('#ticket-preview-modal').modal('hide');
				TicketsService.updateTicket($scope.updatedTicket.key, $rootScope.getAuthenticatedUser().username, $scope.updatedTicket, $rootScope.userTickets, $rootScope.tickets.created, $rootScope.tickets.inProgress, $rootScope.tickets.testing, $rootScope.tickets.done, $scope.loggedWork.amount);
			}
		};

		$scope.deleteTicket = function (key) {
			TicketsService.deleteTicket(key, $rootScope.getAuthenticatedUser().username, $rootScope.userTickets, $rootScope.tickets.created, $rootScope.tickets.inProgress, $rootScope.tickets.testing, $rootScope.tickets.done);
		};
}]);
