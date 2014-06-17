app.directive('ticket', function ($rootScope) {
	return {
		restrict: 'E',
		link: function (scope, element, attr) {
			var setOwnStatus = function () {
				if (scope.ticket.owner === undefined || !scope.ticket.owner.length) {
					scope.ownStatus = "ticket-unassigned";
				} else if (scope.ticket.owner !== $rootScope.username) {
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
			scope.$on('ticketUpdated', function (event) {
				setOwnStatus();
				scope.loggedWork.amount = 0.0;
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
				if (scope.ticket.owner !== $rootScope.username) {
					e.preventDefault();
				} else {
					angular.copy(scope.ticket, $rootScope.copiedEntity);
				}
			});
		},
		replace: true,
		template: "<div id='{{ticket.key}}' draggable class='ticket ticket-code ticket-{{ticket.type}} {{ownStatus}}'>TC-{{ticket.code}}<span class='ticket-title' data-toggle='modal' data-target='#ticket-preview-modal'>{{ticket.title}}<i class='fa fa-times' ng-show='isDeleting && ticket.owner === username'></i></span></div>"
	};
});

app.directive('ticketContainer', function ($rootScope) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			element[0].addEventListener('drop', function (e) {
				$rootScope.copiedEntity.status = element.attr("status");
				angular.copy($rootScope.copiedEntity, scope.updatedTicket);
				scope.$apply();
				scope.updateTicket();
			});
		}
	};
});
