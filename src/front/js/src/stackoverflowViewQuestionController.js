function stackOverflowViewQuestionController(question, $sce, $rootScope) {
	this.question = question;
	this.getHtml = $sce.trustAsHtml;
}