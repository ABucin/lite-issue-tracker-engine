app.service('CommentsService', ['ResourceService',
	function (ResourceService) {

		this.fetchComments = function (key, comments) {
			var callback = function (data) {
				angular.copy(data, comments);
			};
			ResourceService.getData('tickets/' + key + '/comments', null, callback);
		};
}]);
