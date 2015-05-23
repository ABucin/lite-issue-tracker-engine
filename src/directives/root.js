app.directive('resource', ['', function () {
	return {
		restrict: 'E',
		link: function (scope, element, attr) {
			$scope.path = attr.path;
		}
	};
}]);

app.directive('secured', ['$rootScope', '$location', function ($rootScope, $location) {
	return {
		restrict: 'A',
		link: function () {
			if (!$rootScope.isAuthenticated()) {
				$location.path('/login');
			}
		}
	};
}]);

app.directive('highlightable', function () {
	return {
		restrict: 'A',
		link: function (scope, element) {
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
