function stackOverflowViewQuestionController(question, $sce) {
	console.log(question);
	this.question = question;
	this.getHtml = $sce.trustAsHtml;
}