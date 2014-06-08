app.service('CommentsService', ['ResourceService',
	function (ResourceService) {

		this.deleteComment = function (username, commentKey, comments, comment) {
			var callback = function (data) {
				for (var i in comments) {
					if (comments[i].key == commentKey) {
						comments.splice(i, 1);
						comment.content = "";
					}
				}
			};
			ResourceService.deleteData('users/' + username + '/comments/' + commentKey, callback);
		};

		this.addComment = function (username, ticketKey, comment, comments) {
			var callback = function (data) {
				comments.push(data);
				comment.content = "";
			};
			ResourceService.postData('users/' + username + '/tickets/' + ticketKey + '/comments', comment, callback);
		};

		this.editComment = function (username, ticketKey, commentKey, comments, comment, statusObj) {
			var callback = function (data) {
				for (var i in comments) {
					if (comments[i].key == commentKey) {
						data.author = username;
						statusObj.isEditingComment = false;
						comment.content = "";
						angular.copy(data, comments[i]);
					}
				}
			};
			ResourceService.putData('users/' + username + '/tickets/' + ticketKey + '/comments/' + commentKey, comment, callback);
		}

		this.fetchComments = function (ticketKey, comments) {
			var callback = function (data) {
				angular.copy(data, comments);
			};
			ResourceService.getData('tickets/' + ticketKey + '/comments', null, callback);
		};
}]);
