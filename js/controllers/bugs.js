app.controller('BugsCtrl', ['$scope', '$rootScope', '$location',
function($scope, $rootScope, $location) {
    $rootScope.auth = true;
    
    $rootScope.createAction = "Report Bug";
}]);