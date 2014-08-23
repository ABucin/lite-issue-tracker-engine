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

		// CONFIGURATION
		$rootScope.footer = {
			version: "1.0.1",
			year: "2014" + (new Date().getFullYear() !== 2014 ? "-" + new Date().getFullYear() : "")
		};

		/**
		 * Document loading configuration.
		 */
		angular.element(document).ready(function () {
			if ($rootScope.isAuthenticated()) {
				// disable when user auth in place
				UserService.fetchUserData();
				// caches the settings for the current user
				SettingsService.loadSettings();
			}
		});

		/**
		 * Highcharts config options.
		 */
		Highcharts.setOptions({
			chart: {
				style: {
					fontFamily: "Roboto"
				}
			}
		});

		/**
		 * Menu properties.
		 */
		$rootScope.menu = {
			hasDropdown: false,
			filters: {
				displayTickets: 'all'
			}
		};

		/**
		 * Ticket properties.
		 */
		$rootScope.tickets = {
			created: [],
			inProgress: [],
			testing: [],
			done: [],
			isDeleting: false
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
		$rootScope.form = {
			login: {
				username: null,
				password: null
			}
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

		/**
		 * Login and registration page templates.
		 */
		$scope.templates = {
			modals: [{
				url: 'partials/modals/register/register.html'
			}, {
				url: 'partials/modals/register/register-success.html'
			}],
			submenu: [{
				url: 'partials/snippets/menu/submenu.html'
		}]
		};

		$scope.templateRegister = $scope.templates.modals[0];
		$scope.templateRegisterSuccess = $scope.templates.modals[1];

		// FUNCTIONS

		/**
		 * Navigates to the specified page of the application.
		 */
		$rootScope.navigate = function (url) {
			$cookieStore.put('page', {
				name: url
			});
			$location.path('/' + url);
			$rootScope.menu.hasDropdown = false;
			$rootScope.tickets.isDeleting = false;
		};

		/**
		 * Returns the name of the current page. Defaults to dashboard.
		 */
		$rootScope.getPageName = function () {
			var page = $cookieStore.get('page');
			if (page !== undefined && page.name !== undefined) {
				return page.name;
			}

			return "dashboard";
		}

		/**
		 * Retrieves the settings for the current user.
		 */
		$rootScope.getSettings = function () {
			return SettingsService.getSettings();
		}

		/**
		 * Contains modal-related functions.
		 */
		$scope.modal = {
			registration: function (toggle) {
				$rootScope.submitted = false;
				$rootScope.general.errors = [];
				$('#register-modal').modal(toggle);
			}
		}

		/**
		 * Applies padding to the page body for displaying the menu correctly.
		 * This depends on whether or not we are logged in to the dashboard.
		 */
		$scope.togglePadding = function () {
			return ($rootScope.isAuthenticated() === true) ? "body-menu-padding" : "";
		};

		/**
		 * Creates a new user account.
		 */
		$scope.register = function (isValid) {
			$rootScope.submitted = true;
			$rootScope.general.errors = [];
			if ($rootScope.registration.password !== $rootScope.registration.confirmedPassword) {
				isValid = false;
				$rootScope.general.errors = [{
					message: "Password does not match confirmed password."
					}];
			}
			if (isValid) {
				$scope.modal.registration('hide');
				AuthenticationService.register($rootScope.registration);
			}
		};

		/*
		 * Logs in the current user.
		 */
		$scope.login = function (isValid) {
			$rootScope.submitted = true;
			$rootScope.general.errors = [];
			if (isValid) {
				$rootScope.submitted = false;
				AuthenticationService.login($rootScope.form.login);
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
		 * Returns true if user is logged in. False, otherwise.
		 */
		$rootScope.isAuthenticated = function () {
			return AuthenticationService.isAuthenticated();
		};

		/**
		 * Retrieves the currently authenticated user from the cache.
		 */
		$rootScope.getAuthenticatedUser = function () {
			return AuthenticationService.getAuthenticatedUser();
		}

}]);
