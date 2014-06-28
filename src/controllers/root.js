var app = angular.module('issueTracker', ['ngCookies', 'ngRoute', 'ngTouch']);

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

		/**
		 * Menu properties.
		 */
		$rootScope.menu = {
			hasDropdown: false
		};

		/**
		 * Menu filters.
		 */
		$rootScope.filters = {
			displayTickets: 'all'
		};

		/**
		 * Ticket properties.
		 */
		$rootScope.tickets = {
			isDeleting: false,
			copied: {}
		};

		/**
		 * Dashboard variables.
		 */
		$rootScope.dashboard = {
			logEntries: []
		};

		/**
		 * Registration variables.
		 */
		$rootScope.registration = {
			email: null,
			username: null,
			password: null,
			confirmedPassword: null
		};

		/*
		 * Login variables.
		 */
		$rootScope.login = {
			username: null,
			password: null
		};

		/**
		 * General global variables.
		 */
		$rootScope.general = {
			errors: []
		};

		$rootScope.project = "issue-tracker";

		$rootScope.submitted = false;

		$rootScope.userTickets = [];
		$rootScope.users = [];
		$rootScope.workloadData = [];
		$rootScope.createdTickets = [];
		$rootScope.inProgressTickets = [];
		$rootScope.testingTickets = [];
		$rootScope.doneTickets = [];

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
			$rootScope.menu.hasDropdown = false;
			$rootScope.tickets.isDeleting = false;
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

		$scope.showRegistrationModal = function () {
			$rootScope.submitted = false;
			$rootScope.general.errors = [];
			$('#register-modal').modal('show');
		};

		$scope.hideRegistrationModal = function () {
			$rootScope.submitted = false;
			$rootScope.general.errors = [];
			$('#register-modal').modal('hide');
		};

		$scope.register = function (isValid) {
			$rootScope.submitted = true;
			$rootScope.general.errors = [];
			if ($rootScope.registration.password !== $rootScope.registration.confirmedPassword) {
				isValid = false;
				$rootScope.general.errors = [{
					message: "Password does not match confirmed Password."
					}];
			}
			if (isValid) {
				$('#register-modal').modal('hide');
				AuthenticationService.register($rootScope.registration);
				$rootScope.submitted = false;
			}
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
			$rootScope.submitted = true;
			$rootScope.general.errors = [];
			if (isValid) {
				AuthenticationService.login($rootScope.login);
				$rootScope.submitted = false;
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
