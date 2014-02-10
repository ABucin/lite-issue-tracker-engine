var app = angular.module('issueTracker', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider',
function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl : 'partials/login.html',
        controller: 'RootCtrl'
    }).when('/dashboard', {
        templateUrl : 'partials/dashboard.html',
        controller: 'DashboardCtrl'
    }).otherwise({
        redirectTo : '/login',
        controller: 'RootCtrl'
    });
}]);

app.controller('RootCtrl', ['$scope', '$rootScope', '$location',
function($scope, $rootScope, $location) {
    $rootScope.auth = false;

    $scope.redirect = function() {
        $location.path('/dashboard');
    };

}]);

app.controller('DashboardCtrl', ['$scope', '$rootScope', '$location',
function($scope, $rootScope, $location) {
    $rootScope.auth = true;
}]);

