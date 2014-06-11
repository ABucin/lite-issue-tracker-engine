var bugColor = "#CB1F26";
var taskColor = "#21579D";
var chartFontWeight = "300";

exports.getChart = function (type, res) {
	var result = {};
	switch (type) {
	case "loggedHours":
		{
			result = loggedHours;
			break;
		}
	case "ticketCompletion":
		{
			result = ticketCompletion;
			break;
		}
	case "effortEstimation":
		{
			result = effortEstimation;
			break;
		}
	case "assignedTickets":
		{
			result = assignedTickets;
			break;
		}
	default:
		{
			break;
		}
	}
	res.json(result);
};

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
	series: [{
		name: 'mlawrence',
		data: [7, 8, 9, 8, 8, 3, 0]
	}, {
		name: 'athompson',
		data: [7, 6, 8, 11, 8, 2, 1]
	}, {
		name: 'psmith',
		data: [8, 8, 9, 8, 7, 0, 3]
	},
			{
		name: 'jterrence',
		data: [5, 9, 6, 4, 9, 9, 5]
	},{
		name: 'callen',
		data: [8, 8, 8, 9, 6, 6, 9]
	}]
};

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
		categories: ['psmith', 'athompson', 'mlawrence'],
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
	series: [{
		name: 'Bug',
		data: [15, 8, 12]
	}, {
		name: 'Task',
		data: [10, 16, 7]
	}]
};

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
		showLastLabel: true
	},
	yAxis: {
		title: {
			text: 'Effort (hrs.)'
		}
	},
	legend: {
		layout: 'vertical',
		align: 'left',
		verticalAlign: 'top',
		x: 100,
		y: 70,
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
			data: [[40, 40], [70, 70]],
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
			data: [[54, 54], [57, 59], [56, 49], [57, 63], [55, 53], [49, 53], [50, 50]]

		}, {
			name: 'Tasks',
			color: 'rgba(33, 87, 157, .5)',
			data: [[54, 56], [55, 51], [57, 50], [56, 52], [57, 58], [51, 54], [54, 56], [54, 60], [55, 62], [54, 61]]
		}
	]
};

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
		data: [["abucin", 4], ["psmith", 2], ["unassigned", 1]]
	}]
};
