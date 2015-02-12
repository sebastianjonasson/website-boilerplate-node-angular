function linkedInDataService($http) {
    var linkedInDataService = {};

    linkedInDataService.getProfile = function() {
        return $http.get('/linkedin/profile');
    }

    return linkedInDataService;
}