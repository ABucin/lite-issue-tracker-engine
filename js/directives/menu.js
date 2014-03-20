app.directive('trackerMenu', function() {
    return {
        restrict : 'E',
        templateUrl : "partials/menu.html"
    };
});

app.directive('toggleable', function(){
    return {
        restrict: 'C',
        link: function(scope, element, attribute) {
            element.on('click', function(event) {
                element.parent().children().toggleClass('active', false);
                element.toggleClass('active', true);
            });
        } 
    };
});