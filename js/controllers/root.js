var app = angular.module('issueTracker', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider',
function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl : 'partials/login.html',
        controller : 'RootCtrl'
    }).when('/dashboard', {
        templateUrl : 'partials/dashboard.html',
        controller : 'DashboardCtrl'
    }).when('/tasks', {
        templateUrl : 'partials/tasks.html',
        controller : 'TasksCtrl'
    }).when('/bugs', {
        templateUrl : 'partials/bugs.html',
        controller : 'BugsCtrl'
    }).when('/statistics', {
        templateUrl : 'partials/statistics.html',
        controller : 'StatisticsCtrl'
    }).when('/profile', {
        templateUrl : 'partials/profile.html',
        controller : 'ProfileCtrl'
    }).when('/team', {
        templateUrl : 'partials/team.html',
        controller : 'TeamCtrl'
    }).otherwise({
        redirectTo : '/login',
        controller : 'RootCtrl'
    });
}]);

app.controller('RootCtrl', ['$scope', '$rootScope', '$location',
function($scope, $rootScope, $location) {
    $rootScope.auth = false;

    $scope.navigate = function(url) {
        $location.path('/' + url);
    };

    $scope.logout = function() {
        $location.path('/login');
        $rootScope.auth = false;
    };
}]); 