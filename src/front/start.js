(function() {
angular.module('website', ['ui.router', 'ngProgress', 'ngAnimate'])
    .controller('mainCtrl', mainCtrl)
    .controller('stackOverflowController', stackOverflowController)
    .controller('githubController', githubController)
    .controller('linkedinController', linkedinController)
    .factory('stackOverflowDataService', stackOverflowDataService)
    .factory('githubDataService', githubDataService)
    .factory('linkedInDataService', linkedInDataService)
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', mainConfig])

function mainConfig($stateProvider, $urlRouterProvider, $locationProvider) {

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

function mainCtrl($scope, ngProgress, $rootScope) {

    $rootScope.$on('$stateChangeStart', function() {
        ngProgress.start();
    })
    $rootScope.$on('$stateChangeSuccess', function() {
        ngProgress.complete();
    })
}










})();