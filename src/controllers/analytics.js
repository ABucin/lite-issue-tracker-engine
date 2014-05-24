app.controller('AnalyticsCtrl', ['$scope', '$rootScope', '$location',
function($scope, $rootScope, $location) {
    $rootScope.auth = true;
    $rootScope.canFilter = false;
	$rootScope.onAnalytics = true;

    $scope.chart = function(){
        $('#chart').highcharts({
            chart: {
                type: 'line'
            },
            title: {
                text: 'Logged Hours'
            },
            xAxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                title: {
                    text: 'Hours'
                }
            },
            tooltip: {
                enabled: false,
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +': '+ this.y +'°C';
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            credits: {
                enabled: false
            },
            series: $rootScope.loggedHoursData
        });
    };

    $scope.chart2 = function(){
         $('#chart2').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Ticket Completion by User'
            },
            xAxis: {
                categories: ['psmith', 'athompson', 'mlawrence'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
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
            series: $rootScope.ticketCompletionData
        });
    };

    $scope.chart3 = function() {
        $('#chart3').highcharts({
            chart: {
                type: 'scatter'
            },
            title: {
                text: 'Effort vs. Estimation of Tickets by Type'
            },
            xAxis: {
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
                        radius: 5,
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
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x} hrs. est., {point.y} hrs. eff.'
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: $rootScope.scatterData
        });
    };
}]);
