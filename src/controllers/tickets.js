app.controller('TicketsCtrl', ['$scope', '$rootScope', '$location', 'TicketsService', 'CommentsService', 'LogsService', 'UserService',
	function ($scope, $rootScope, $location, TicketsService, CommentsService, LogsService, UserService) {
		$rootScope.menu.hasDropdown = true;
		$scope.isEditing = false;

		$scope.status = {
			isEditingComment: false
		};
		$scope.ownComment = "";
		$scope.editedCommentKey = "";
		$scope.priorityIconClass = "";

		$scope.comments = [];

		$scope.updatedTicket = {};
		$scope.deletedTicket = {};
		$scope.copiedTicket = {};

		$scope.ticketTabs = {
			info: true,
			comments: false
		};

		$scope.loggedWork = {
			amount: 0.0
		};

		var handleFetchUser = function (response) {
			$rootScope.users = response;
			$rootScope.userTickets = [];
			$rootScope.tickets = {
				created: [],
				inProgress: [],
				testing: [],
				done: []
			};

			for (var i in response) {
				var tickets = $rootScope.users[i].tickets;

				for (var j in tickets) {
					var status = tickets[j].status;
					tickets[j].creator = $rootScope.users[i].username;
					$rootScope.userTickets.push(tickets[j]);
					$rootScope.tickets[status].push(tickets[j]);
				}
			}
		};

		angular.element(document).ready(function () {
			UserService.fetchUserData()
				.then(handleFetchUser);
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
			url: 'views/modals/tickets/ticket-create.html'
		},
			{
				url: 'views/modals/tickets/ticket-edit.html'
			},
			{
				url: 'views/modals/tickets/ticket-delete.html'
			}];

		$scope.templateCreate = $scope.templates[0];
		$scope.templateEdit = $scope.templates[1];
		$scope.templateDelete = $scope.templates[2];

		$scope.markForEdit = function (commentKey, commentContent) {
			$scope.status.isEditingComment = true;
			$scope.editedCommentKey = commentKey;
			$scope.comment.content = commentContent;
		};

		$scope.filterByOwner = function (owner) {
			switch ($rootScope.menu.filters.byTicketOwner) {
				case 'all':
				{
					return true;
				}
				case 'mine':
				{
					return (owner === $rootScope.getAuthenticatedUser().username);
				}
				case 'unassigned':
				{
					return (owner === undefined || !owner.length);
				}
				default:
				{
					return false;
				}
			}
		};

		$scope.filterByPriority = function (priority) {
			var filter = $rootScope.menu.filters.byTicketPriority;

			if (filter === 'all') {
				return true;
			} else if (filter === 'minor' || filter === 'normal' || filter === 'major') {
				return (priority === filter);
			}

			return false;
		};

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

			LogsService.logData(log)
				.then(function (response) {
					$rootScope.dashboard.logEntries.push(response);
				});
		};

		/*
		 * Comments.
		 */
		$scope.addComment = function (isValid) {
			if (isValid) {
				CommentsService.addComment($rootScope.getAuthenticatedUser().key, $scope.updatedTicket.key, $scope.comment)
					.then(function (response) {
						$scope.comments.push(response);
						$rootScope.$broadcast('ticketCommentAdded', {
							key: response.ticket
						});
						$scope.comment.content = "";
					});
			}
		};

		$scope.deleteComment = function (commentKey) {
			CommentsService.deleteComment($rootScope.getAuthenticatedUser().key, commentKey)
				.then(function () {
					for (var i in $scope.comments) {
						if ($scope.comments[i].key == commentKey) {
							$scope.comments.splice(i, 1);
							$scope.comment.content = "";
						}
					}
				});
		};

		$scope.editComment = function (isValid) {
			$rootScope.submitted = true;
			$rootScope.general.errors = [];
			if (isValid) {
				$rootScope.submitted = false;
				$rootScope.general.errors = [];
				CommentsService.editComment($rootScope.getAuthenticatedUser().key, $scope.updatedTicket.key, $scope.editedCommentKey, $scope.comment)
					.then(function (response) {
						for (var i in $scope.comments) {
							if ($scope.comments[i].key == $scope.editedCommentKey) {
								response.author = $rootScope.getAuthenticatedUser().username;
								$scope.status.isEditingComment = false;
								$scope.comment.content = "";
								angular.copy(response, $scope.comments[i]);
							}
						}
					});
			}
		};

		$scope.fetchComments = function (ticketKey) {
			CommentsService.fetchComments(ticketKey)
				.then(function (response) {
					angular.copy(response, $scope.comments);
				});
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
				TicketsService.addTicket($rootScope.getAuthenticatedUser().key, $scope.ticket)
					.then(function (response) {
						$rootScope.userTickets.push(response);
						$rootScope.tickets.created.push(response);
						$scope.logData("create", response);
					});
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
				TicketsService.updateTicket($scope.updatedTicket.key, $scope.updatedTicket, $scope.loggedWork.amount)
					.then(function (response) {
						for (var i in $rootScope.userTickets) {
							if ($rootScope.userTickets[i].key == response.key) {
								angular.copy(response, $rootScope.userTickets[i]);
								$rootScope.$broadcast('ticketUpdated', {
									key: response.key
								});
								break;
							}
						}

						switch (response.status) {
							case "created":
							{
								for (var i in $rootScope.tickets.created) {
									if ($rootScope.tickets.created[i].key == response.key) {
										angular.copy(response, $rootScope.tickets.created[i]);
										break;
									}
								}
								break;
							}
							case "inProgress":
							{
								for (var i in $rootScope.tickets.inProgress) {
									if ($rootScope.tickets.inProgress[i].key == response.key) {
										angular.copy(response, $rootScope.tickets.inProgress[i]);
										break;
									}
								}
								break;
							}
							case "testing":
							{
								for (var i in $rootScope.tickets.testing) {
									if ($rootScope.tickets.testing[i].key == response.key) {
										angular.copy(response, $rootScope.tickets.testing[i]);
										break;
									}
								}
								break;
							}
							case "done":
							{
								for (var i in $rootScope.tickets.done) {
									if ($rootScope.tickets.done[i].key == response.key) {
										angular.copy(response, $rootScope.tickets.done[i]);
										break;
									}
								}
								break;
							}
							default:
							{
							}
						}
					});
			}
		};

		$scope.deleteTicket = function (key) {
			return TicketsService.deleteTicket(key)
				.then(function () {
					var deletedTicketStatus = "";

					for (var i in $rootScope.userTickets) {
						if ($rootScope.userTickets[i].key == key) {
							deletedTicketStatus = $rootScope.userTickets[i].status;
							$rootScope.userTickets.splice(i, 1);
							$rootScope.$broadcast('ticketDeleted', {
								key: key
							});
							break;
						}
					}

					switch (deletedTicketStatus) {
						case "created":
						{
							for (var i in $rootScope.tickets.created) {
								if ($rootScope.tickets.created[i].key == key) {
									$rootScope.tickets.created.splice(i, 1);
									break;
								}
							}
							break;
						}
						case "inProgress":
						{
							for (var i in $rootScope.tickets.inProgress) {
								if ($rootScope.tickets.inProgress[i].key == key) {
									$rootScope.tickets.inProgress.splice(i, 1);
									break;
								}
							}
							break;
						}
						case "testing":
						{
							for (var i in $rootScope.tickets.testing) {
								if ($rootScope.tickets.testing[i].key == key) {
									$rootScope.tickets.testing.splice(i, 1);
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
						}
					}
				});
		};

		$scope.showTicketTab = function (tab) {
			for (var k in $scope.ticketTabs) {
				$scope.ticketTabs[k] = k === tab;
			}
		};
	}]);
