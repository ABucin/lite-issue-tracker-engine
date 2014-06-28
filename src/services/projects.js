app.service('ProjectsService', ['$rootScope', '$cookieStore', 'ResourceService',
	function ($rootScope, $cookieStore, ResourceService) {

		this.updateProject = function(oldProject, project){
			var callback = function(data) {
				var temp = $cookieStore.get('user');
				temp.project = data.project;
				$cookieStore.put('user', temp);
			};

			ResourceService.putData('projects/' + oldProject, project, callback);
		};
}]);
