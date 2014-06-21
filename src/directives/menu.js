app.directive('trackerMenu', function () {
	return {
		restrict: 'E',
		templateUrl: "partials/menu.html"
	};
});

app.directive('toggleable', function ($rootScope) {
	return {
		restrict: 'C',
		link: function (scope, element, attribute) {
			var pageName = $rootScope.getPageName();

			if (pageName === attribute.url) {
				element.toggleClass('active', true);
			}

			element.on('click', function (event) {
				element.parent().children().toggleClass('active', false);
				element.toggleClass('active', true);
			});
		}
	};
});
