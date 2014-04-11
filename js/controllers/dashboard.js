app.controller('DashboardCtrl', ['$scope', '$rootScope', '$location',
function($scope, $rootScope, $location) {
    $rootScope.canFilter = false;
    $rootScope.auth = true;
    $rootScope.dashboardChart();
}]);
