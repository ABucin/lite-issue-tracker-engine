app.service('CommentsService', ['ResourceService',
	function (ResourceService) {

		this.deleteComment = function (username, commentKey, comments) {
			var callback = function (data) {
				for (var i in comments) {
					if (comments[i].key == commentKey) {
						comments.splice(i, 1);
					}
				}
			};
			ResourceService.deleteData('users/' + username + '/comments/' + commentKey, callback);
		};

		this.addComment = function (username, key, comment, comments) {
			var callback = function (data) {
				comments.push(data);
			};
			ResourceService.postData('users/' + username + '/tickets/' + key + '/comments', comment, callback);
		};

		this.fetchComments = function (key, comments) {
			var callback = function (data) {
				angular.copy(data, comments);
			};
			ResourceService.getData('tickets/' + key + '/comments', null, callback);
		};
}]);
