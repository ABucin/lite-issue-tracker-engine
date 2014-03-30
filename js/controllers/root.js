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
    $rootScope.username = "abucin";
    $rootScope.createAction = "";

    $rootScope.maxUserTasks = 10;

    $rootScope.auth = false;
    $rootScope.canFilter = false;
    $scope.displayAll = true;

    $rootScope.tickets = [];
    $rootScope.logEntries = [];
    $rootScope.users = [];

    /**
     * TODO - Disable this when there is a DB
     * What happens when every page is loaded.
     */
    angular.element(document).ready(function () {
        $scope.fetchMainData();
        $scope.fetchLogData();
        $scope.fetchUserData();
    });

    $scope.fetchMainData = function() {
        $http({
            method : 'GET',
            url : '/issue-tracker/data/main.json'
        }).success(function(data) {
            $rootScope.tickets = data.tickets;
        }).error(function(data, status) {
            alert(status + " : " + data);
        });
    };

    $scope.fetchLogData = function() {
        $http({
            method : 'GET',
            url : '/issue-tracker/data/log.json'
        }).success(function(data) {
            $rootScope.logEntries = data.entries;
        }).error(function(data, status) {
            alert(status + " : " + data);
        });
    };

    $scope.fetchUserData = function() {
        $http({
            method : 'GET',
            url : '/issue-tracker/data/user.json'
        }).success(function(data) {
            $rootScope.users = data.users;
        }).error(function(data, status) {
            alert(status + " : " + data);
        });
    };

    $scope.navigate = function(url) {
        $location.path('/' + url);
    };

    $scope.task = {
            code: "XX-01",
            title: "",
            status: "created",
            owner: "abucin",
            type: "task"
    };

    $scope.bug = {
            code: "XX-02",
            title: "",
            status: "created",
            owner: "abucin",
            type: "bug"
    };

    $scope.addTicket = function(type) {
        var data = {};
        if (type === 'task') {
            angular.copy($scope.task, data);     
        } else {
            angular.copy($scope.bug, data);
        }
        $rootScope.tickets.push(data);
    }; 

    /**
     * Applies padding to the page body for displaying the menu correctly.
     * This depends on whether or not we are logged in to the dashboard.
     */
    $scope.togglePadding = function() {
        return ($rootScope.auth === true) ? "body-menu-padding" : "";
    };

    /*
     * Logs in the current user.
     */
    $scope.login = function() {
        $rootScope.auth = true;
        $scope.navigate('dashboard');
    };

    /*
     * Logs out the current user.
     */
    $scope.logout = function() {
        $rootScope.auth = false;
        $scope.navigate('login');
    };
}]);
