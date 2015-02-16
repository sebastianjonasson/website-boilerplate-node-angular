function router($stateProvider, $urlRouterProvider, $locationProvider) {
    var resolveStackoverflowItems = function(stackOverflowDataService) {
            return stackOverflowDataService.getData();
        },
        resolveStackoverflowProfile = function(stackOverflowDataService) {
            return stackOverflowDataService.getProfile();
        },
        resolveGithubRepos = function(githubDataService) {
            return githubDataService.getRepos();
        },
        resolveGithubProfile = function(githubDataService) {
            return githubDataService.getProfile();
        },
        resolveLinkedinProfile = function(linkedInDataService) {
            return linkedInDataService.getProfile();
        };

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
            controller: 'appController as appCtrl',
            resolve: {
                profile: ['linkedInDataService',resolveLinkedinProfile]
            }
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
                items: ['stackOverflowDataService',resolveStackoverflowItems],
                profile: ['stackOverflowDataService', resolveStackoverflowProfile]
            }
        })
        .state('app.github', {
            templateUrl: 'partials/github.html',
            url: '/github',
            controller: 'githubController as git',
            resolve: {
                repos: ['githubDataService', resolveGithubRepos],
                profile: ['githubDataService',resolveGithubProfile],
            }
        })
        .state('app.linkedin', {
            templateUrl: 'partials/linkedin.html',
            url: '/linkedin',
            controller:'linkedinController as li'
        })
}