app.service('AnalyticsService', ['ResourceService',
    function (ResourceService) {

        /**
         * Retrieves chart data and attaches it to the provided div.
         * @param type what kind of chart to retrieve
         * @param divId id of the div to which the chart will be attached
         */
        this.fetchChartData = function (type, divId) {
            var id = (divId === undefined) ? "#chart" : divId,
                callback = function (data) {
                    $(id).highcharts(data);
                },
                params = {
                    type: type
                };
            ResourceService.getData('analytics', params, callback);
        };
    }]);
