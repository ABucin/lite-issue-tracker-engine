app.service('CommentsService', ['HttpService',
	function (HttpService) {

		this.deleteComment = function (userId, commentKey) {
			return HttpService._delete('users/' + userId + '/comments/' + commentKey);
		};

		this.addComment = function (userId, ticketKey, comment) {
			return HttpService._post('users/' + userId + '/tickets/' + ticketKey + '/comments', comment);
		};

		this.editComment = function (userId, ticketKey, commentKey, comment) {
			return HttpService._put('users/' + userId + '/tickets/' + ticketKey + '/comments/' + commentKey, comment);
		};

		this.fetchComments = function (ticketKey) {
			return HttpService._get('tickets/' + ticketKey + '/comments');
		};
}]);
