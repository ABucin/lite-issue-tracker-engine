app.controller('DashboardCtrl', ['$scope', '$rootScope', '$location',
function($scope, $rootScope, $location) {
    $rootScope.auth = true;
    
    $scope.chart = function() {
        $('#chart').highcharts({
            chart : {
                plotBackgroundColor : null,
                plotBorderWidth : null,
                plotShadow : false
            },
            title : {
                text : 'Workload'
            },
            tooltip : {
                pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions : {
                pie : {
                    allowPointSelect : true,
                    cursor : 'pointer',
                    dataLabels : {
                        enabled : true,
                        color : '#000000',
                        connectorColor : '#000000',
                        format : '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            credits: {
                enabled: false
            },
            series : [{
                type : 'pie',
                name : 'Assigned tickets',
                data : [['mlawrence', 5], ['athompson', 3], ['psmith', 4]]
            }]
        });
    };
}]);
