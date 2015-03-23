function stackOverflowProfileController(profile, activity, items, $state, questions) {
	console.log(questions);
	this.profile = profile.data.items[0];
	this.labels = activity.labels;
  	this.data = activity.data;
  	this.recentAnswers = angular.copy(items).data.items.splice(0,5);
  	this.recentQuestions = angular.copy(questions).data.items.splice(0,5);

  	this.viewAnswer = function(id) {
  		$state.go('app.stackoverflow.viewanswer', {answerId: id});
  	}

  	this.viewQuestion = function(id) {
  		$state.go('app.stackoverflow.viewquestion', {questionId: id});
  	}

}