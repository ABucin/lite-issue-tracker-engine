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
    }).when('/settings', {
        templateUrl : 'partials/settings.html',
        controller : 'SettingsCtrl'
    }).otherwise({
        redirectTo : '/login',
        controller : 'RootCtrl'
    });
}]);

app.controller('RootCtrl', ['$scope', '$rootScope', '$location', '$http',
function($scope, $rootScope, $location, $http) {
    $rootScope.auth = false;

    $rootScope.bugs = [];
    $rootScope.tasks = [];


    $scope.fetchUserData = function() {
        $http({
            method : 'GET',
            url : '/issue-tracker/data/main.json'
        }).success(function(data) {
            $rootScope.bugs = data.bugs;
            $rootScope.tasks = data.tasks;
        }).error(function(data, status) {
            alert(status + " : " + data);
        });
    }; 


    $scope.navigate = function(url) {
        $location.path('/' + url);
    };

    /**
     * Applies padding to the page body for displaying the menu correctly.
     * This depends on whether or not we are logged in to the dashboard.
     */
    $scope.togglePadding = function() {
        return ($rootScope.auth === true) ? "body-menu-padding" : "";
    };

    /*
     * Logs out the current user.
     */
    $scope.logout = function() {
        $location.path('/login');
        $rootScope.auth = false;
    };
}]);
