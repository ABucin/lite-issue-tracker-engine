app.controller('SettingsCtrl', ['$scope', '$rootScope', '$location',
function ($scope, $rootScope, $location) {
		$rootScope.auth = true;
		$rootScope.onAnalytics = false;
		$rootScope.canFilter = false;
		$rootScope.fetchSettingsData('profile');

}]);
