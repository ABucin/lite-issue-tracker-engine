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