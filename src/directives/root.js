app.directive('ticket', function ($rootScope) {

	function templateFunction(tElem, tAttr) {
		var type = tAttr.type;
		var codePrefix = "TA-";
		if (type === "bug") {
			codePrefix = "BG-";
		}
		return "<div id='{{ticket.key}}' draggable class='ticket ticket-code ticket-" + type + "'>" + codePrefix + "{{ticket.code}}<span class='ticket-title' data-toggle='modal' data-target='#ticket-preview-modal'>{{ticket.title}}<i class='fa fa-times' ng-show='isDeleting && ticket.username === username'></i></span></div>"
	}

	return {
		restrict: 'E',
		link: function (scope, element, attr) {
			console.log(scope.ticket.owner);
			if (scope.ticket.owner === undefined) {
				element.addClass("ticket-unassigned");
			} else if (scope.ticket.owner !== $rootScope.username) {
				element.addClass("ticket-not-owned");
			}

			element.find('i').on('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				$rootScope.deletedTask.key = scope.ticket.key;
				$('#ticket-delete-modal').modal('show');
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
		template: templateFunction
	};
});

app.directive('resource', function ($rootScope) {
	return {
		restrict: 'E',
		link: function (scope, element, attr) {
			$scope.path = attr.path;
		}
	};
});

app.directive('ticketContainer', function ($rootScope) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			element[0].addEventListener('drop', function (e) {
				$rootScope.copiedEntity.status = element.attr("status");
				if ($rootScope.copiedEntity.type === "task") {
					angular.copy($rootScope.copiedEntity, $rootScope.updatedTask);
				} else if ($rootScope.copiedEntity.type === "bug") {
					angular.copy($rootScope.copiedEntity, $rootScope.updatedBug);
				}
				scope.$apply();
				scope.updateTicket($rootScope.copiedEntity.type);
			});
		}
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

app.directive('highlightable', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			element[0].addEventListener('dragenter', function (e) {
				element.css({
					"background-color": "#e6e6e6"
				});
			});

			element[0].addEventListener('dragover', function (e) {
				element.css({
					"background-color": "#e6e6e6"
				});
			});

			element[0].addEventListener('dragleave', function (e) {
				element.css({
					"background-color": "transparent"
				});
			});

			element[0].addEventListener('drop', function (e) {
				element.css({
					"background-color": "transparent"
				});
			});

			element[0].addEventListener('dragend', function (e) {
				element.css({
					"background-color": "transparent"
				});
			});
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
