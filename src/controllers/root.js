var app = angular.module('issueTracker', ['ngCookies', 'ngRoute']);

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

app.controller('RootCtrl', ['$scope', '$rootScope', '$location', '$http', '$cookieStore', 'ResourceService', 'UserService', 'AuthenticationService', 'SettingsService',
function ($scope, $rootScope, $location, $http, $cookieStore, ResourceService, UserService, AuthenticationService, SettingsService) {
		$rootScope.createAction = null;

		$rootScope.canFilter = false;
		$rootScope.hasDropdown = false;
		$rootScope.actions = {
			isDeleting: false
		};
		$rootScope.filters = {
			displayTickets: 'all'
		};

		$rootScope.project = "issue-tracker";

		$rootScope.submitted = false;

		$rootScope.tickets = [];
		$rootScope.users = [];
		$rootScope.workloadData = [];
		$rootScope.createdTickets = [];
		$rootScope.inProgressTickets = [];
		$rootScope.testingTickets = [];
		$rootScope.doneTickets = [];

		$rootScope.copiedEntity = {};
		$rootScope.currentUser = {};

		$rootScope.dashboard = {
			logEntries: []
		};

		$rootScope.general = {
			errors: []
		};

		$rootScope.registrationData = {
			email: null,
			username: null,
			password: null,
			confirmedPassword: null
		};

		$rootScope.loginData = {
			username: null,
			password: null
		};

		$scope.submenuTemplates = [{
			url: 'partials/snippets/menu/submenu.html'
		}];

		$scope.templates = [{
			url: 'partials/modals/register/register.html'
			}, {
			url: 'partials/modals/register/register-success.html'
			}];
		$scope.templateRegister = $scope.templates[0];
		$scope.templateRegisterSuccess = $scope.templates[1];

		angular.element(document).ready(function () {
			$scope.loadData();

			// set Highcharts config options
			Highcharts.setOptions({
				chart: {
					style: {
						fontFamily: "Roboto"
					}
				}
			});
		});

		$rootScope.navigate = function (url) {
			$location.path('/' + url);
			$cookieStore.put('page', {
				name: url
			});
		};

		$rootScope.getPageName = function () {
			var page = $cookieStore.get('page');
			if (page !== undefined && page.name !== undefined) {
				return page.name;
			}

			return "dashboard";
		}

		$scope.register = function () {
			AuthenticationService.register($rootScope.registrationData);
		};

		$scope.loadData = function () {
			if ($rootScope.isAuthenticated()) {
				// disable when user auth in place
				UserService.fetchUserData();
				// caches the settings for the current user
				SettingsService.loadSettings();
			}
		}

		$rootScope.getSettings = function () {
			return SettingsService.getSettings();
		}

		/**
		 * Applies padding to the page body for displaying the menu correctly.
		 * This depends on whether or not we are logged in to the dashboard.
		 */
		$scope.togglePadding = function () {
			return ($rootScope.isAuthenticated() === true) ? "body-menu-padding" : "";
		};

		/*
		 * Logs in the current user.
		 */
		$scope.login = function (isValid) {
			$scope.submitted = true;
			if (isValid) {
				AuthenticationService.login($rootScope.loginData);
				$scope.submitted = false;
			}
		};

		/*
		 * Logs out the current user.
		 */
		$scope.logout = function () {
			AuthenticationService.logout();
		};

		/**
		 * Checks if the user is authenticated.
		 */
		$rootScope.isAuthenticated = function () {
			return AuthenticationService.isAuthenticated();
		};

		/**
		 * Retrieves the current authenticated user.
		 */
		$rootScope.getAuthenticatedUser = function () {
			return AuthenticationService.getAuthenticatedUser();
		}

}]);
