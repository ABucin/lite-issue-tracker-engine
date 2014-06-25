app.directive('ticket', function ($rootScope) {
	return {
		restrict: 'E',
		link: function (scope, element, attr) {
			var setOwnStatus = function () {
				if (scope.ticket.owner === undefined || !scope.ticket.owner.length) {
					scope.ownStatus = "ticket-unassigned";
				} else if (scope.ticket.owner !== $rootScope.getAuthenticatedUser().username) {
					scope.ownStatus = "ticket-not-owned";
				} else {
					scope.ownStatus = "";
				}
			}

			setOwnStatus();

			element.find('i').on('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				scope.deletedTicket.key = scope.ticket.key;
				$('#ticket-delete-modal').modal('show');
			});

			// update the owner of the ticket (CSS-wise)
			scope.$on('ticketUpdated', function (event, args) {
				if (args.key === scope.ticket.key) {
					setOwnStatus();
					if (scope.updatedTicket.loggedTime !== 0.0) {
						scope.logData("logTime", scope.updatedTicket);
					} else {
						scope.logData("update", scope.updatedTicket);
					}
					scope.loggedWork.amount = 0.0;
					scope.updatedTicket.loggedTime = 0.0;
				}
			});

			// log the ticket deletion
			scope.$on('ticketDeleted', function (event, args) {
				if (args.key === scope.ticket.key) {
					scope.logData("delete", scope.ticket);
				}
			});

			// log the ticket creation
			scope.$on('ticketCreated', function (event, args) {
				if (args.ticket.key === scope.ticket.key) {
					scope.logData("create", args.ticket);
				}
			});

			// log the ticket comment adding
			scope.$on('ticketCommentAdded', function (event, args) {
				if (args.key === scope.ticket.key) {
					scope.logData("comment", scope.ticket);
				}
			});

			element.on('click', function (event) {
				scope.isEditing = true;
				scope.fetchComments(scope.ticket.key);
				// display the clicked ticket data in the modal
				if (scope.updatedTicket.code === null || scope.ticket.key !== scope.updatedTicket.key) {
					angular.copy(scope.ticket, scope.updatedTicket);
				}
				scope.$apply();
			});

			element[0].addEventListener('dragstart', function (e) {
				// cannot drag and drop the tickets that are not assigned to current user
				if (scope.ticket.owner !== $rootScope.getAuthenticatedUser().username) {
					e.preventDefault();
				} else {
					angular.copy(scope.ticket, $rootScope.copiedEntity);
				}
			});
		},
		replace: true,
		template: "<div id='{{ticket.key}}' draggable class='ticket ticket-code ticket-{{ticket.type}} {{ownStatus}}'>TC-{{ticket.code}}<span class='ticket-title' data-toggle='modal' data-target='#ticket-preview-modal'>{{ticket.title}}<i class='fa fa-times' ng-show='actions.isDeleting && ticket.owner === getAuthenticatedUser().username'></i></span></div>"
	};
});

app.directive('ticketContainer', function ($rootScope) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			element[0].addEventListener('drop', function (e) {
				$rootScope.copiedEntity.status = element.attr("status");
				angular.copy($rootScope.copiedEntity, scope.updatedTicket);
				scope.updatedTicket.loggedTime = 0.0;
				scope.$apply();
				scope.updateTicket();
			});
		}
	};
});
