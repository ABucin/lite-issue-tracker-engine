app.service('ProjectsService', ['HttpService',
	function (HttpService) {

		this.updateProject = function(oldProjectId, project){
			return HttpService._put('projects/' + oldProjectId, project);
		};
}]);
