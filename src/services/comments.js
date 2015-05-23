app.service('CommentsService', ['$rootScope', 'HttpService',
	function ($rootScope, HttpService) {

		this.deleteComment = function (userId, commentKey, comments, comment) {
			var callback = function () {
				for (var i in comments) {
					if (comments[i].key == commentKey) {
						comments.splice(i, 1);
						comment.content = "";
					}
				}
			};
			HttpService.deleteData('users/' + userId + '/comments/' + commentKey, callback);
		};

		this.addComment = function (userId, ticketKey, comment, comments) {
			var callback = function (data) {
				comments.push(data);
				$rootScope.$broadcast('ticketCommentAdded', {
					key: data.ticket
				});
				comment.content = "";
			};
			HttpService.postData('users/' + userId + '/tickets/' + ticketKey + '/comments', comment, callback);
		};

		this.editComment = function (userId, username, ticketKey, commentKey, comments, comment, statusObj) {
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
			HttpService.putData('users/' + userId + '/tickets/' + ticketKey + '/comments/' + commentKey, comment, callback);
		};

		this.fetchComments = function (ticketKey, comments) {
			var callback = function (data) {
				angular.copy(data, comments);
			};
			HttpService.getData('tickets/' + ticketKey + '/comments', null, callback);
		};
}]);
