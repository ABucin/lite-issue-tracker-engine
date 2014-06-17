var app = angular.module('issueTracker', ['ngRoute']);

/**
 * Associates each route to a controller and a template.
 */
app.config(['$routeProvider',
function ($routeProvider) {
		$routeProvider.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'RootCtrl'
		}).when('/dashboard', {
			templateUrl: 'partials/dashboard.html',
			controller: 'DashboardCtrl'
		}).when('/tickets', {
			templateUrl: 'partials/tickets.html',
			controller: 'TicketsCtrl'
		}).when('/analytics', {
			templateUrl: 'partials/analytics.html',
			controller: 'AnalyticsCtrl'
		}).when('/team', {
			templateUrl: 'partials/team.html',
			controller: 'TeamCtrl'
		}).when('/settings', {
			templateUrl: 'partials/settings.html',
			controller: 'SettingsCtrl'
		}).otherwise({
			redirectTo: '/login',
			controller: 'RootCtrl'
		});
}]);

app.controller('RootCtrl', ['$scope', '$rootScope', '$location', '$http', 'ResourceService', 'UserService',
function ($scope, $rootScope, $location, $http, ResourceService, UserService) {
		$rootScope.username = "abucin";
		$rootScope.createAction = null;

		$rootScope.auth = false;
		$rootScope.canFilter = false;
		$rootScope.isDeleting = false;
		$rootScope.displayAll = true;

		$rootScope.tickets = [];
		$rootScope.users = [];
		$rootScope.workloadData = [];
		$rootScope.createdTickets = [];
		$rootScope.inProgressTickets = [];
		$rootScope.testingTickets = [];
		$rootScope.doneTickets = [];
		$rootScope.errors = [];

		$rootScope.copiedEntity = {};

		$rootScope.dashboard = {
			logEntries: []
		};

		$rootScope.registrationData = {
			email: null,
			password: null,
			confirmedPassword: null
		};

		$scope.templates = [{
			url: 'partials/modals/register/register.html'
			}, {
			url: 'partials/modals/register/register-success.html'
			}];
		$scope.templateRegister = $scope.templates[0];
		$scope.templateRegisterSuccess = $scope.templates[1];

		angular.element(document).ready(function () {
			// disable when user auth in place
			$scope.fetchUserData();

			// set Highcharts config options
			Highcharts.setOptions({
				chart: {
					style: {
						fontFamily: "Roboto"
					}
				}
			});
		});

		$scope.navigate = function (url) {
			$location.path('/' + url);
		};

		$scope.register = function () {
			UserService.register($rootScope.registrationData);
		};

		$scope.fetchUserData = function () {
			UserService.fetchUserData();
		}

		/**
		 * Applies padding to the page body for displaying the menu correctly.
		 * This depends on whether or not we are logged in to the dashboard.
		 */
		$scope.togglePadding = function () {
			return ($rootScope.auth === true) ? "body-menu-padding" : "";
		};

		/*
		 * Logs in the current user.
		 */
		$scope.login = function () {
			$rootScope.auth = true;
			$scope.navigate('dashboard');
		};

		/*
		 * Logs out the current user.
		 */
		$scope.logout = function () {
			$rootScope.auth = false;
			$scope.navigate('login');
		};

}]);
