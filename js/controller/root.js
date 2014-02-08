var app = angular.module('issueTracker', ['ui.bootstrap']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl : "index.html",
        controller : "RootCtrl"
    })
    .otherwise({
        template: "This doesn't exist!"
    });
});

app.controller("RootCtrl", ["$scope",
function($scope) {

}]);
