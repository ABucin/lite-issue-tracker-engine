app.controller('BugsCtrl', ['$scope', '$rootScope', '$location',
function ($scope, $rootScope, $location) {
		$rootScope.auth = true;
		$rootScope.canFilter = true;
		$rootScope.createAction = "Report Bug";
		$rootScope.deleteAction = "Delete Bugs";

		$scope.isEditing = false;

		$scope.templates = [{
				url: 'partials/modals/tasks/task_create.html'
						},
			{
				url: 'partials/modals/tasks/task_edit.html'
						},
			{
				url: 'partials/modals/tasks/task_delete.html'
						}];

		$scope.templateCreate = $scope.templates[0];
		$scope.templateEdit = $scope.templates[1];
		$scope.templateDelete = $scope.templates[2];
}]);
