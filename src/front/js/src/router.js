function router($stateProvider, $urlRouterProvider, $locationProvider) {

    //$locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('start', {
            templateUrl: 'links.html',
            url: '/'
        })
        .state('app', {
            abstract: true,
            templateUrl: 'partials/layout.html',
        })
        .state('app.home', {
            templateUrl: 'partials/home.html',
            url: '/home'
        })
        .state('app.stackoverflow', {
            templateUrl: 'partials/stackoverflow.html',
            url: '/stackoverflow',
            controller: 'stackOverflowController as soCtrl',
            resolve: {
                items: function(stackOverflowDataService) {
                    return stackOverflowDataService.getData();
                },
                profile: function(stackOverflowDataService) {
                    return stackOverflowDataService.getProfile();
                }
            }
        })
        .state('app.github', {
            templateUrl: 'partials/github.html',
            url: '/github',
            controller: 'githubController as git',
            resolve: {
                repos: function(githubDataService) {
                    return githubDataService.getRepos();
                },
                profile: function(githubDataService) {
                    return githubDataService.getProfile();
                },
            }
        })
        .state('app.linkedin', {
            templateUrl: 'partials/linkedin.html',
            url: '/linkedin',
            controller:'linkedinController as li',
            resolve: {
                profile: function(linkedInDataService) {
                    return linkedInDataService.getProfile();
                }
            }
        })
}