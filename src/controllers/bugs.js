app.controller('BugsCtrl', ['$scope', '$rootScope', '$location',
function ($scope, $rootScope, $location) {
		$rootScope.auth = true;
		$rootScope.canFilter = true;
		$rootScope.createAction = "Report Bug";
		$rootScope.deleteAction = "Delete Bugs";

		$scope.isEditing = false;
}]);
