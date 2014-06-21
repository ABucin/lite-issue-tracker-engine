var bugColor = "#CB1F26";
var taskColor = "#21579D";
var chartFontWeight = "300";

var persistenceService = require('./persistence');
var utils = require('../utils/utils');

exports.getChart = function (type, res) {
	var result = {};
	switch (type) {
	case "loggedHours":
		{
			var callback = function (users) {
				var series = [];
				var currentDate = new Date();

				for (var i in users) {
					var logged = [0, 0, 0, 0, 0, 0, 0];
					for (var l in users[i].logs) {
						var tstamp = users[i].logs[l].timestamp;
						if (tstamp !== undefined && utils.getWeekNumber(currentDate) === utils.getWeekNumber(tstamp)) {
							logged[tstamp.getDay() - 1] += users[i].logs[l].amount;
						}
					}

					series.push({
						name: users[i].username,
						data: logged
					});
				}

				var loggedHours = {
					chart: {
						type: 'line'
					},
					title: {
						text: 'Logged Hours',
						style: {
							fontWeight: chartFontWeight
						}
					},
					xAxis: {
						categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
						tickmarkPlacement: "on"
					},
					yAxis: {
						allowDecimals: false,
						min: 0,
						title: {
							text: 'Hours'
						}
					},
					tooltip: {
						formatter: function () {
							var suffix = (this.y === 1) ? ' hr.' : ' hrs.'
							return this.y + suffix;
						}
					},
					plotOptions: {
						line: {
							marker: {
								symbol: "circle"
							},
							enableMouseTracking: true
						}
					},
					credits: {
						enabled: false
					},
					series: series
				};

				res.json(loggedHours);
			};
			persistenceService.getAllUsersCallback(callback);
			break;
		}
	case "ticketCompletion":
		{
			var callback = function (users) {
				var usernames = [];
				var series = [{
					name: 'Bug',
					data: []
	}, {
					name: 'Task',
					data: []
	}];

				for (var i in users) {
					usernames.push(users[i].username);
					var bt = 0;
					var tt = 0;

					for (var t in users[i].tickets) {
						if (users[i].tickets[t].status === "done" && users[i].tickets[t].owner === users[i].username) {
							if (users[i].tickets[t].type === "bug") {
								bt++;
							} else if (users[i].tickets[t].type === "task") {
								tt++;
							}
						}
					}

					series[0].data.push(bt);
					series[1].data.push(tt);
				}

				var ticketCompletion = {
					chart: {
						type: 'bar'
					},
					colors: [bugColor, taskColor],
					title: {
						text: 'Ticket Completion by User',
						style: {
							fontWeight: chartFontWeight
						}
					},
					xAxis: {
						categories: usernames,
						title: {
							text: null
						}
					},
					yAxis: {
						allowDecimals: false,
						min: 0,
						tickInterval: 5,
						title: {
							text: 'Amount',
							align: 'high'
						},
						labels: {
							overflow: 'justify'
						}
					},
					plotOptions: {
						bar: {
							dataLabels: {
								enabled: true
							}
						}
					},
					legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'top',
						x: -40,
						y: 100,
						floating: true,
						borderWidth: 1,
						backgroundColor: '#FFFFFF',
						shadow: true
					},
					credits: {
						enabled: false
					},
					series: series
				};

				res.json(ticketCompletion);
			};
			persistenceService.getAllUsersCallback(callback);
			break;
		}
	case "effortEstimation":
		{
			var callback = function (users) {

				var bugEffortEstimation = [];
				var taskEffortEstimation = [];
				var maxEstimation = 0;

				for (var i in users) {
					for (var t in users[i].tickets) {
						if (users[i].tickets[t].status !== "done") {
							if (users[i].tickets[t].estimatedTime > maxEstimation) {
								maxEstimation = users[i].tickets[t].estimatedTime;
							}
							if (users[i].tickets[t].type === "bug") {
								bugEffortEstimation.push([users[i].tickets[t].estimatedTime, users[i].tickets[t].loggedTime]);
							} else if (users[i].tickets[t].type === "task") {
								taskEffortEstimation.push([users[i].tickets[t].estimatedTime, users[i].tickets[t].loggedTime]);
							}
						}
					}
				}
				var effortEstimation = {
					chart: {
						type: 'scatter'
					},
					title: {
						text: 'Effort vs. Estimation of Open Tickets by Type',
						style: {
							fontWeight: chartFontWeight
						}
					},
					xAxis: {
						allowDecimals: false,
						title: {
							enabled: true,
							text: 'Estimation (hrs.)'
						},
						startOnTick: true,
						endOnTick: true,
						showLastLabel: true,
						min: 0
					},
					yAxis: {
						title: {
							text: 'Effort (hrs.)'
						},
						min: 0
					},
					legend: {
						layout: 'vertical',
						align: 'left',
						verticalAlign: 'top',
						x: 60,
						y: 40,
						floating: true,
						backgroundColor: '#FFFFFF',
						borderWidth: 1
					},
					plotOptions: {
						scatter: {
							marker: {
								symbol: "circle",
								radius: 7,
								states: {
									hover: {
										enabled: true,
										lineColor: 'rgb(100,100,100)'
									}
								}
							},
							states: {
								hover: {
									marker: {
										enabled: false
									}
								}
							},
							tooltip: {
								headerFormat: '<strong>{series.name}</strong><br>',
								pointFormat: '<strong>Est.:</strong> {point.x} hrs.<br><strong>Log.:</strong> {point.y} hrs.'
							}
						}
					},
					credits: {
						enabled: false
					},
					series: [
						{
							type: 'line',
							name: 'Regression Line',
							data: [[0, 0], [maxEstimation + 10, maxEstimation + 10]],
							color: '#555',
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
							color: 'rgba(203, 31, 38, .5)',
							data: bugEffortEstimation

		}, {
							name: 'Tasks',
							color: 'rgba(33, 87, 157, .5)',
							data: taskEffortEstimation
		}
	]
				};

				res.json(effortEstimation);
			}
			persistenceService.getAllUsersCallback(callback);
			break;
		}
	case "assignedTickets":
		{
			var callback = function (users) {
				var data = [];
				var ut = 0;
				for (var i in users) {
					var ct = 0;
					for (var t in users[i].tickets) {
						if (users[i].tickets[t].status !== "done") {
							if (users[i].tickets[t].owner === users[i].username) {
								ct++;
							} else if (users[i].tickets[t].owner !== undefined && !users[i].tickets[t].owner.length) {
								ut++;
							}
						}
					}
					data.push([users[i].username, ct]);
				}
				data.push(["unassigned", ut]);

				var assignedTickets = {
					chart: {
						plotBackgroundColor: null,
						plotBorderWidth: null,
						plotShadow: false
					},
					title: {
						text: 'Assigned Tickets',
						style: {
							fontWeight: chartFontWeight
						}
					},
					tooltip: {
						pointFormat: '{series.name}: <strong>{point.percentage:.1f}%</strong>'
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
						data: data
	}]
				};

				res.json(assignedTickets);
			};
			persistenceService.getAllUsersCallback(callback);
			break;
		}
	default:
		{
			break;
		}
	}
};
