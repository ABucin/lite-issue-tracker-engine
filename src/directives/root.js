app.directive('resource', function ($rootScope) {
	return {
		restrict: 'E',
		link: function (scope, element, attr) {
			$scope.path = attr.path;
		}
	};
});

app.directive('secured', function ($rootScope, $location) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (!$rootScope.isAuthenticated()) {
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
