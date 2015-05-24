app.config(['$routeProvider',
	function ($routeProvider) {
		/**
		 * Associates each route to a controller and a template.
		 */
		$routeProvider.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'RootCtrl'
		}).when('/dashboard', {
			templateUrl: 'views/dashboard.html',
			controller: 'DashboardCtrl'
		}).when('/tickets', {
			templateUrl: 'views/tickets.html',
			controller: 'TicketsCtrl'
		}).when('/analytics', {
			templateUrl: 'views/analytics.html',
			controller: 'AnalyticsCtrl'
		}).when('/team', {
			templateUrl: 'views/team.html',
			controller: 'TeamCtrl'
		}).when('/settings', {
			templateUrl: 'views/settings.html',
			controller: 'SettingsCtrl'
		}).otherwise({
			redirectTo: '/login',
			controller: 'RootCtrl'
		});
	}])
	.run(['$rootScope', function ($rootScope) {
		$rootScope.footer = {
			version: "1.4",
			year: "2014" + (new Date().getFullYear() !== 2014 ? "-" + new Date().getFullYear() : "")
		};
	}])
	.controller('RootCtrl',
	['$scope', '$rootScope', '$location', '$http', '$cookies', 'HttpService', 'UserService', 'AuthenticationService', 'SettingsService', 'SecurityService',
		function ($scope, $rootScope, $location, $http, $cookies, HttpService, UserService, AuthenticationService, SettingsService, SecurityService) {
			var handleFetchUser = function (response) {
				$rootScope.users = response;
				$rootScope.userTickets = [];
				$rootScope.tickets = {
					created: [],
					inProgress: [],
					testing: [],
					done: []
				};

				for (var i in response) {
					var tickets = $rootScope.users[i].tickets;

					for (var j in tickets) {
						var status = tickets[j].status;
						tickets[j].creator = $rootScope.users[i].username;
						$rootScope.userTickets.push(tickets[j]);
						$rootScope.tickets[status].push(tickets[j]);
					}
				}
			};

			/**
			 * Document loading configuration.
			 */
			angular.element(document).ready(function () {
				if ($rootScope.isAuthenticated()) {
					// disable when user auth in place
					UserService.fetchUserData()
						.then(function (response) {
							handleFetchUser(response);
							// caches the settings for the current user
							SettingsService.loadSettings();
						});
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
					byTicketOwner: 'all',
					byTicketPriority: 'all'
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

			/**
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
			 * Login and registration page views.
			 */
			$scope.templates = {
				modals: [{
					url: 'views/modals/register/register.html'
				}, {
					url: 'views/modals/register/register-success.html'
				}],
				submenu: [{
					url: 'views/layout/submenu.html'
				}]
			};

			$scope.templateRegister = $scope.templates.modals[0];
			$scope.templateRegisterSuccess = $scope.templates.modals[1];

			// FUNCTIONS

			/**
			 * Navigates to the specified page of the application.
			 */
			$rootScope.navigate = function (url) {
				$cookies.putObject('page', {
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
				var page = $cookies.getObject('page');
				if (page !== undefined && page.name !== undefined) {
					return page.name;
				}

				return "dashboard";
			};

			/**
			 * Retrieves the settings for the current user.
			 */
			$rootScope.getSettings = function () {
				return SettingsService.getSettings();
			};

			/**
			 * Contains modal-related functions.
			 */
			$scope.modal = {
				registration: function (toggle) {
					$rootScope.submitted = false;
					$rootScope.general.errors = [];
					$('#register-modal').modal(toggle);
				}
			};

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
					AuthenticationService.register($rootScope.registration)
						.then(function (response) {
							$cookies.putObject('user', response);
							$rootScope.general.errors = [];
							$("#register-modal").modal('hide');
							$('#register-success-modal').modal('show');
							// caches the settings for the current user
							return SettingsService.loadSettings();
						}, function (error) {
							$rootScope.general.errors.push(error);
						});
				}
			};

			/**
			 * Logs in the current user.
			 */
			$scope.login = function (isValid) {
				$rootScope.submitted = true;
				$rootScope.general.errors = [];

				if (isValid) {
					$rootScope.submitted = false;
					AuthenticationService.login($rootScope.form.login)
						.then(function (response) {
							response.password = $rootScope.form.login.password;
							$cookies.putObject('user', response);
							// caches the settings for the current user
							return SettingsService.loadSettings();
						}, function (error) {
							$rootScope.general.errors.push(error);
						})
						.then(function () {
							$rootScope.navigate('dashboard');
						});
				}
			};

			/**
			 * Logs out the current user.
			 */
			$scope.logout = function () {
				AuthenticationService.logout()
					.then(function () {
						$cookies.remove('user');
						$cookies.remove('page');
						$cookies.remove('settings');
						$cookies.remove('analytics-subpage');
						$cookies.remove('settings-subpage');
						$rootScope.navigate('login');
					});
			};

			/**
			 * Checks if the user is authenticated.
			 * Returns true if user is logged in. False, otherwise.
			 */
			$rootScope.isAuthenticated = function () {
				return SecurityService.isAuthenticated();
			};

			/**
			 * Retrieves the currently authenticated user from the cache.
			 */
			$rootScope.getAuthenticatedUser = function () {
				return SecurityService.getAuthenticatedUser();
			}

		}]);
