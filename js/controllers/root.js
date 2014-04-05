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
    $rootScope.workloadData = [['mlawrence', 5], ['athompson', 3], ['psmith', 4], ['rgreen', 5], ['abucin', 2]];
    $rootScope.loggedHoursData = [{
                name: 'mlawrence',
                data: [7, 8, 9, 8, 8]
            }, {
                name: 'athompson',
                data: [7, 6, 8, 11, 8]
            }, {
                name: 'psmith',
                data: [8, 8, 9, 8, 7]
            }];
    $rootScope.ticketCompletionData = [{
                name: 'Bug',
                data: [15, 31, 12]
            }, {
                name: 'Task',
                data: [13, 16, 5]
            }];
    $rootScope.scatterData = [{
                type: 'line',
                name: 'Regression Line',
                data: [[20, 20], [100, 100]],
                marker: {
                    enabled: false
                },
                states: {
                    hover: {
                        lineWidth: 0
                    }
                },
                enableMouseTracking: false
            },{
                name: 'Bugs',
                color: 'rgba(223, 83, 83, .5)',
                data: [[51, 51], [57, 59], [56, 49], [57, 63], [55, 53]]
    
            }, {
                name: 'Tasks',
                color: 'rgba(119, 152, 191, .5)',
                data: [[74, 65], [75, 71], [93, 80], [86, 72], [87, 78],
                    [81, 74], [84, 86], [84, 78], [75, 62], [84, 81]]
            }];

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
        } else if (type === 'bug') {
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
