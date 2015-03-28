function appController($rootScope, $window) {
	this.hideSidebar = false;
	var self = this;
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		if(toState.name == "app.stackoverflow.viewanswer" || toState.name == "app.stackoverflow.viewquestion") {
			self.hideSidebar = true;
		} else {
			self.hideSidebar = ($window.innerWidth < 767);
		}
	})
}