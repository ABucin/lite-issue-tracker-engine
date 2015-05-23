app.service('ProjectsService', ['$rootScope', '$cookies', 'HttpService',
	function ($rootScope, $cookies, HttpService) {

		this.updateProject = function(oldProjectId, project){
			var callback = function(data) {
				var temp = $cookies.getObject('user');
				temp.project = data.project;
				$cookies.putObject('user', temp);
			};

			HttpService.putData('projects/' + oldProjectId, project, callback);
		};
}]);
