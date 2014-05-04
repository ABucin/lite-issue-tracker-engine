app.controller('TeamCtrl', ['$scope', '$rootScope', '$location',
function($scope, $rootScope, $location) {
    $rootScope.auth = true;
    $rootScope.canFilter = false;
	$rootScope.deleteAction = "Delete Users";

    $rootScope.createAction = "Add User";
}]);
