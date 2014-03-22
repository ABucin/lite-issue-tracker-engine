app.directive('ticket', function($rootScope) {
    function templateFunction(tElem, tAttr) {
        var type = "label-info";
        if(tAttr.task === undefined) {
            type = "label-danger";
        }
        return "<div class='label " + type + "'>{{ticket.code}} | {{ticket.title}}</div>";
    }

    return {
        restrict : 'E',
        link : function(scope, element, attr) {
            if (scope.ticket.owner !== $rootScope.username) {
                var fillColor = element.css('background-color');
                var textColor = element.css('color');
                element.css({
                    "color" : fillColor,
                    "background-color" : textColor,
                    "border" : "1px solid " + fillColor
                });
            }
        },
        replace : true,
        template : templateFunction
    };
});

app.directive('secured', function($rootScope, $location){
    return {
        restrict : 'A',
        link : function(scope, element, attr) {
            if($rootScope.auth === false){
                $location.path('/login');
            }
        }
    };
});
