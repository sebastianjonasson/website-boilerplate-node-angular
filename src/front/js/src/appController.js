function appController($rootScope) {
	$rootScope.$on('toggleSidebar', function(e, toggle) {
		this.hideSidebar = true;
		console.log("got caught!"+ toggle);
	});
	this.hideSidebar = false;
}