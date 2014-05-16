var app = angular.module('issueTracker', ['ngRoute']);

app.config(['$routeProvider',
function ($routeProvider) {
		$routeProvider.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'RootCtrl'
		}).when('/dashboard', {
			templateUrl: 'partials/dashboard.html',
			controller: 'DashboardCtrl'
		}).when('/tasks', {
			templateUrl: 'partials/tasks.html',
			controller: 'TasksCtrl'
		}).when('/bugs', {
			templateUrl: 'partials/bugs.html',
			controller: 'BugsCtrl'
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

		$rootScope.tickets = [];
		$rootScope.logEntries = [];
		$rootScope.users = [];
		$rootScope.workloadData = [];
		$rootScope.createdTickets = [];
		$rootScope.inProgressTickets = [];
		$rootScope.testingTickets = [];
		$rootScope.doneTickets = [];
		$rootScope.errors = [];

		$rootScope.updatedTask = {};
		$rootScope.deletedTask = {};
		$rootScope.updatedBug = {};
		$rootScope.deletedBug = {};
		$rootScope.copiedEntity = {};

		$rootScope.task = {
			title: "",
			description: "",
			type: "task",
			estimatedTime: 0,
			loggedTime: 0,
			creator: $rootScope.username
		};

		$rootScope.bug = {
			title: "",
			description: "",
			type: "bug",
			estimatedTime: 0,
			loggedTime: 0,
			creator: $rootScope.username
		};

		$rootScope.registrationData = {
			email: "",
			password: "",
			confirmedPassword: ""
		};

		$scope.templates = [{
				url: 'partials/modals/register/register.html'
			},{
				url: 'partials/modals/register/register-success.html'
			}];
		$scope.templateRegister = $scope.templates[0];
		$scope.templateRegisterSuccess = $scope.templates[1];

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
 }, {
			name: 'Bugs',
			color: 'rgba(223, 83, 83, .5)',
			data: [[51, 51], [57, 59], [56, 49], [57, 63], [55, 53]]

 }, {
			name: 'Tasks',
			color: 'rgba(119, 152, 191, .5)',
			data: [[74, 65], [75, 71], [93, 80], [86, 72], [87, 78], [81, 74], [84, 86], [84, 78], [75, 62], [84, 81]]
 }];

		/**
		 * TODO - Disable this when there is a DB
		 * What happens when every page is loaded.
		 */
		angular.element(document).ready(function () {
			$scope.fetchUserData();
		});

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
						tickets[j].username = $rootScope.users[i].username;
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

				$rootScope.dashboardChart();
			}).error(function (data, status) {
				alert(status + " : " + data);
			});
		};

		$scope.navigate = function (url) {
			$location.path('/' + url);
		};

		$scope.addTicket = function (type) {
			var data = {};
			if (type === 'task') {
				angular.copy($rootScope.task, data);
			} else if (type === 'bug') {
				angular.copy($rootScope.bug, data);
			}

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
			if (type === 'task') {
				angular.copy($rootScope.updatedTask, data);
			} else if (type === 'bug') {
				angular.copy($rootScope.updatedBug, data);
			}

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

		$scope.registerUser = function() {
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
			}).error(function(data) {
				$rootScope.errors = data;
			});
		};

		$rootScope.dashboardChart = function () {
			$('#panel-workload').highcharts({
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				title: {
					text: 'Assigned Tickets'
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						size: '100%',
						cursor: 'pointer',
						dataLabels: {
							enabled: false
						},
                    showInLegend: true
					}
				},
				credits: {
					enabled: false
				},
				series: [{
					type: 'pie',
					name: 'Assigned tickets',
					data: $rootScope.workloadData
            }]
			});
		};
}]);
