app.controller('TeamCtrl', ['$scope', '$rootScope', '$location',
function($scope, $rootScope, $location) {
    $rootScope.auth = true;
    $rootScope.canFilter = false;

    $rootScope.createAction = "Add User";
}]);