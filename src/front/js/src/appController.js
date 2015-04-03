function appController($rootScope, $window, $location, $anchorScroll) {
	this.hideSidebar = false;
	var self = this;
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		$location.hash('top');
      	$anchorScroll();

		if(toState.name == "app.stackoverflow.viewanswer" || toState.name == "app.stackoverflow.viewquestion") {
			self.hideSidebar = true;
		} else {
			self.hideSidebar = ($window.innerWidth < 767);
		}
	})
}