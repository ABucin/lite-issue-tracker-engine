app.directive('overhead', function($rootScope) {
    return {
        restrict : 'E',
        replace : true,
        link : function(scope, elem, attr) {
            scope.width = 0;
            scope.color = "success";
            scope.tasksLabel = "";

            if (scope.user.tasks > 0) {
                scope.tasksLabel = scope.user.tasks;
            }

            if (scope.user.tasks > 3 && scope.user.tasks < 7) {
                scope.color = "warning";
            } else if (scope.user.tasks >= 7) {
                scope.color = "danger";
            }

            if (scope.user.tasks <= $rootScope.maxUserTasks) {
                scope.width = scope.user.tasks * 10;
            }
        },
        template : "<div class='progress'>" +
        "<div class='progress-bar progress-bar-{{color}}' role='progressbar' aria-valuenow='{{user.tasks}}' aria-valuemin='0' aria-valuemax='10' "
        + "style='width: {{width}}%;'>{{tasksLabel}}/10</div></div>"
    };
});

app.directive('time', function($rootScope) {
    return {
        restrict : 'E',
        replace : true,
        link : function(scope, elem, attr) {
            scope.full = scope.user.estimatedTime + scope.user.loggedTime;
            // gives a percentage of estimated time out of total
            scope.estimatedWidth = (scope.user.estimatedTime * 100 / scope.full);
            scope.loggedWidth = 100 - scope.estimatedWidth;
            // the area of the bar
            scope.estimatedValue = scope.estimatedWidth / 10;
            scope.loggedValue = 10 - scope.estimatedValue;
        },
        template : "<div class='progress'>"+
                        "<div class='progress-bar progress-bar-success' role='progressbar' tooltip-placement='top' tooltip='Logged Time' aria-valuenow='{{loggedValue}}' aria-valuemin='0' aria-valuemax='10' style='width: {{loggedWidth}}%;'>"+
                            "{{user.loggedTime}}h"+
                        "</div>"+
                        "<div class='progress-bar progress-bar-danger' role='progressbar' tooltip-placement='top' tooltip='Estimated Time' aria-valuenow='{{estimatedValue}}' aria-valuemin='0' aria-valuemax='10' style='width: {{estimatedWidth}}%;'>"+
                            "{{user.estimatedTime}}h"+
                        "</div>"+
                   " </div>"
    };
});
