function githubDataService($http) {
    var githubDataService = {};

    githubDataService.getRepos = function() {
        return $http.get('/github/repos');
    }

    githubDataService.getProfile = function() {
        return $http.get('/github/profile');
    }

    return githubDataService;
}