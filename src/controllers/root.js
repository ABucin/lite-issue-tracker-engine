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

		$rootScope.updatedTicket = {};
		$rootScope.deletedTicket = {};
		$rootScope.copiedEntity = {};
		$rootScope.settingsData = {};
		$rootScope.settingsTemplate = {};

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

		$rootScope.fetchChartData = function (type, elementId) {
			var id = (elementId == null) ? "#chart" : "#" + elementId;
			$http({
				method: 'GET',
				url: '/itracker/api/analytics',
				params: {
					type: type
				}
			}).success(function (data) {
				$(id).highcharts(data);
			});
		};

		$rootScope.fetchSettingsData = function (type) {
			$rootScope.settingsTemplate.url = 'partials/snippets/settings/' + type + '.html';
			$http({
				method: 'GET',
				url: '/itracker/api/config',
				params: {
					type: type
				}
			}).success(function (data) {
				$rootScope.settingsData = data;
			});
		};

		$scope.fetchUserData = function () {
			$http({
				method: 'GET',
				url: '/itracker/api/users'
				//				params: {
				//					uname: $rootScope.username
				//				}
			}).success(function (data) {
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
			}).error(function (data, status) {
				alert(status + " : " + data);
			});
		};

		$scope.navigate = function (url) {
			$location.path('/' + url);
		};

		$scope.addTicket = function () {
			var data = {};
			angular.copy($rootScope.ticket, data);

			$http({
				method: 'POST',
				url: '/itracker/api/users/' + $rootScope.username + '/tickets',
				data: data
			}).success(function (data) {
				$rootScope.tickets.push(data);
				$rootScope.createdTickets.push(data);
			});
		};

		$scope.updateTicket = function (type) {
			var data = {};
			angular.copy($rootScope.updatedTicket, data);

			$http({
				method: 'PUT',
				url: '/itracker/api/users/' + $rootScope.username + '/tickets/' + data.key,
				data: data
			}).success(function (data) {
				for (var i in $rootScope.tickets) {
					if ($rootScope.tickets[i].key == data.key) {
						angular.copy(data, $rootScope.tickets[i]);
						break;
					}
				}

				switch (data.status) {
				case "created":
					{
						for (var i in $rootScope.createdTickets) {
							if ($rootScope.createdTickets[i].key == data.key) {
								angular.copy(data, $rootScope.createdTickets[i]);
								break;
							}
						}
						break;
					}
				case "in_progress":
					{
						for (var i in $rootScope.inProgressTickets) {
							if ($rootScope.inProgressTickets[i].key == data.key) {
								angular.copy(data, $rootScope.inProgressTickets[i]);
								break;
							}
						}
						break;
					}
				case "testing":
					{
						for (var i in $rootScope.testingTickets) {
							if ($rootScope.testingTickets[i].key == data.key) {
								angular.copy(data, $rootScope.testingTickets[i]);
								break;
							}
						}
						break;
					}
				case "done":
					{
						for (var i in $rootScope.doneTickets) {
							if ($rootScope.doneTickets[i].key == data.key) {
								angular.copy(data, $rootScope.doneTickets[i]);
								break;
							}
						}
						break;
					}
				default:
					{
						for (var i in $rootScope.doneTickets) {
							if ($rootScope.doneTickets[i].key == data.key) {
								angular.copy(data, $rootScope.doneTickets[i]);
								break;
							}
						}
					}
				}
			});
		};

		$scope.deleteTicket = function (key) {
			$http({
				method: 'DELETE',
				url: '/itracker/api/users/' + $rootScope.username + '/tickets/' + key
			}).success(function () {
				var deletedTicketStatus = "";

				for (var i in $rootScope.tickets) {
					if ($rootScope.tickets[i].key == key) {
						deletedTicketStatus = $rootScope.tickets[i].status;
						$rootScope.tickets.splice(i, 1);
						break;
					}
				}

				switch (deletedTicketStatus) {
				case "created":
					{
						for (var i in $rootScope.createdTickets) {
							if ($rootScope.createdTickets[i].key == key) {
								$rootScope.createdTickets.splice(i, 1);
								break;
							}
						}
						break;
					}
				case "in_progress":
					{
						for (var i in $rootScope.inProgressTickets) {
							if ($rootScope.inProgressTickets[i].key == key) {
								$rootScope.inProgressTickets.splice(i, 1);
								break;
							}
						}
						break;
					}
				case "testing":
					{
						for (var i in $rootScope.testingTickets) {
							if ($rootScope.testingTickets[i].key == key) {
								$rootScope.testingTickets.splice(i, 1);
								break;
							}
						}
						break;
					}
				case "done":
					{
						for (var i in $rootScope.doneTickets) {
							if ($rootScope.doneTickets[i].key == key) {
								$rootScope.doneTickets.splice(i, 1);
								break;
							}
						}
						break;
					}
				default:
					{
						for (var i in $rootScope.doneTickets) {
							if ($rootScope.doneTickets[i].key == key) {
								$rootScope.doneTickets.splice(i, 1);;
								break;
							}
						}
					}
				}
			});
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
			var data = {};
			angular.copy($rootScope.registrationData, data);

			$http({
				method: 'POST',
				url: '/itracker/api/users/',
				data: data
			}).success(function (data) {
				$rootScope.errors = [];
				$("#register-modal").modal('hide');
				$('#register-success-modal').modal('show');
			}).error(function (data) {
				$rootScope.errors = data;
			});
		};
}]);
