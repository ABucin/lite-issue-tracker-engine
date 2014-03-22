app.controller('TasksCtrl', ['$scope', '$rootScope', '$location',
function($scope, $rootScope, $location) {
    $rootScope.auth = true;
    $rootScope.canFilter = true;
    
    $rootScope.createAction = "Create Task";
}]);