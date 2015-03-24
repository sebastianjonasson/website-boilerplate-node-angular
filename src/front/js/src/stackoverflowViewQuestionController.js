function stackOverflowViewQuestionController(question, $sce, $rootScope) {
	console.log(question);
	this.question = question;
	this.getHtml = $sce.trustAsHtml;
}