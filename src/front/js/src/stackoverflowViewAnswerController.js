function stackOverflowViewAnswerController(answer, $sce) {
	this.answer = answer;
	this.getHtml = $sce.trustAsHtml;
}