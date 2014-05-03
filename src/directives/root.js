app.directive('ticket', function ($rootScope) {

	function templateFunction(tElem, tAttr) {
		var type = "task";
		if (tAttr.task === undefined) {
			type = "bug";
		}
		return "<div id='{{ticket.key}}' draggable class='ticket ticket-code ticket-" + type + "'>{{ticket.code}}<span class='ticket-title' data-toggle='modal' data-target='#ticket-preview-modal'>{{ticket.title}}</span><i class='fa fa-times' ng-show='isDeleting && ticket.username === username'></i></div>"
	}

	return {
		restrict: 'E',
		link: function (scope, element, attr) {
			if (scope.ticket.username !== $rootScope.username) {
				element.css({
					"background-color": "#3F424B"
				});
			}
			element.find('i').on('click', function (event) {
				scope.deleteTicket(scope.ticket.key);
			});
			element.on('click', function (event) {
				scope.isEditing = true;
				// display the clicked ticket data in the modal
				if (scope.ticket.type === "task") {
					if ($rootScope.updatedTask.code === null || scope.ticket.key !== $rootScope.updatedTask.key) {
						angular.copy(scope.ticket, $rootScope.updatedTask);
					}
				} else if (scope.ticket.type === "bug") {
					if ($rootScope.updatedBug.code === null || scope.ticket.key !== $rootScope.updatedBug.key) {
						angular.copy(scope.ticket, $rootScope.updatedBug);
					}
				}
				scope.$apply();
			});

			element[0].addEventListener('drop', function (e) {
				$rootScope.copiedEntity.status = element.parent().attr("status");
				if ($rootScope.copiedEntity.type === "task") {
					angular.copy($rootScope.copiedEntity, $rootScope.updatedTask);
				} else if ($rootScope.copiedEntity.type === "bug") {
					angular.copy($rootScope.copiedEntity, $rootScope.updatedBug);
				}
				scope.$apply();
				scope.updateTicket($rootScope.copiedEntity.type);
			});

			element[0].addEventListener('dragstart', function (e) {
				angular.copy(scope.ticket, $rootScope.copiedEntity);
			});
		},
		replace: true,
		template: templateFunction
	};
});

app.directive('secured', function ($rootScope, $location) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if ($rootScope.auth === false) {
				$location.path('/login');
			}
		}
	};
});

app.directive('collapsibleIcon', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			element.on('click', function (event) {
				if (element.hasClass("fa-minus") && element.parent().parent().parent().children().hasClass('collapse')) {
					element.toggleClass("fa-minus", false);
					element.toggleClass("fa-plus", true);
				} else {
					element.toggleClass("fa-minus", true);
					element.toggleClass("fa-plus", false);
				}
			});
		}
	};
});
