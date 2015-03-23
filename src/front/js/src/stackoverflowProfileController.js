function stackOverflowProfileController(profile) {
	this.profile = profile.data.items[0];
	this.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
  	this.data = [300, 500, 100, 40, 120];
}