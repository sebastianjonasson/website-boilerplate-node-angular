function stackOverflowProfileController(profile, activity, items, $state) {
	console.log(activity);
	console.log(items);
	this.profile = profile.data.items[0];
	this.labels = activity.labels;
  	this.data = activity.data;
  	this.recentAnswers = angular.copy(items).data.items.splice(0,5);

  	this.viewAnswer = function(id) {
  		$state.go('app.stackoverflow.viewanswer', {answerId: id});
  	}

}