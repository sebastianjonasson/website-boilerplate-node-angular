function stackOverflowDataService($http) {
    var stackOverflowDataService = {};

    stackOverflowDataService.getData = function() {
        return $http.get('/stackoverflow/items');
    }

    stackOverflowDataService.getProfile = function() {
        return $http.get('/stackoverflow/profile');
    }

    return stackOverflowDataService;
}