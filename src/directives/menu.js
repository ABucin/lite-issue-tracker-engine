app.directive('trackerMenu', function () {
	return {
		restrict: 'E',
		templateUrl: "views/menu.html"
	};
});

app.directive('toggleable', ['$rootScope', function ($rootScope) {
	return {
		restrict: 'C',
		link: function (scope, element, attribute) {
			var pageName = $rootScope.getPageName();

			if (pageName === attribute.url) {
				element.toggleClass('active', true);
			} else {
				element.toggleClass('active', false);
			}

			element.on('click', function () {
				element.parent().children().toggleClass('active', false);
				element.toggleClass('active', true);
			});
		}
	};
}]);
