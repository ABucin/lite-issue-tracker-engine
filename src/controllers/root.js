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

app.controller('RootCtrl', ['$scope', '$rootScope', '$location', '$http',
function ($scope, $rootScope, $location, $http) {
		$rootScope.username = "abucin";
		$rootScope.createAction = "";

		$rootScope.maxUserTasks = 10;
		$rootScope.latestTicketCode = 0;

		$rootScope.auth = false;
		$rootScope.canFilter = false;
		$rootScope.isDeleting = false;
		$rootScope.displayAll = true;
		$rootScope.onAnalytics = false;

		$rootScope.tickets = [];
		$rootScope.logEntries = [];
		$rootScope.users = [];
		$rootScope.workloadData = [];
		$rootScope.createdTickets = [];
		$rootScope.inProgressTickets = [];
		$rootScope.testingTickets = [];
		$rootScope.doneTickets = [];
		$rootScope.errors = [];

		$rootScope.deletedTicket = {};
		$rootScope.copiedEntity = {};

		$rootScope.registrationData = {
			email: "",
			password: "",
			confirmedPassword: ""
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

		$rootScope.getData = function (path, params, callback) {
			$rootScope.resource('GET', path, params, null, callback);
		};

		$rootScope.postData = function (path, data, callback) {
			$rootScope.resource('POST', path, null, data, callback);
		};

		$rootScope.putData = function (path, data, callback) {
			$rootScope.resource('PUT', path, null, data, callback);
		};

		$rootScope.deleteData = function (path, callback) {
			$rootScope.resource('DELETE', path, null, null, callback);
		};

		$rootScope.resource = function (method, path, params, data, callback) {
			$http({
				method: method,
				url: '/itracker/api/' + path,
				params: params,
				data: data
			}).success(function (data) {
				callback(data);
			}).error(function (data, status) {
				$rootScope.errors = data;
			});
		};

		$scope.fetchUserData = function () {
			var callback = function(data) {
				$rootScope.users = data;
				$rootScope.workloadData = [];
				$rootScope.tickets = [];
				$rootScope.logEntries = [];

				for (var i in data) {
					$rootScope.workloadData.push([data[i].username, data[i].tickets.length]);

					var tickets = $rootScope.users[i].tickets;
					var logs = $rootScope.users[i].logs;

					for (var j in tickets) {
						tickets[j].creator = $rootScope.users[i].username;
						$rootScope.tickets.push(tickets[j]);
						switch (tickets[j].status) {
						case "created":
							{
								$rootScope.createdTickets.push(tickets[j]);
								break;
							}
						case "in_progress":
							{
								$rootScope.inProgressTickets.push(tickets[j]);
								break;
							}
						case "testing":
							{
								$rootScope.testingTickets.push(tickets[j]);
								break;
							}
						case "done":
							{
								$rootScope.doneTickets.push(tickets[j]);
								break;
							}
						default:
							{
								$rootScope.doneTickets.push(tickets[j]);
							}
						}
					}

					for (var j in logs) {
						logs[j].username = $rootScope.users[i].username;
						$rootScope.logEntries.push(logs[j]);
					}
				}
			}

			$rootScope.getData('users', null, callback);
		};

		$scope.navigate = function (url) {
			$location.path('/' + url);
		};

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

		$scope.registerUser = function () {
			var callback = function(data){
				$rootScope.errors = [];
				$("#register-modal").modal('hide');
				$('#register-success-modal').modal('show');
			};

			$rootScope.postData('users', $rootScope.registrationData, callback);
		};
}]);
