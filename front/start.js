(function() {
angular.module('website', ['ui.router', 'ngProgress', 'ngAnimate'])
    .controller('mainCtrl', mainCtrl)
    .controller('stackOverflowController', stackOverflowController)
    .controller('githubController', githubController)
    .factory('stackOverflowDataService', stackOverflowDataService)
    .factory('githubDataService', githubDataService)
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
                    }
                }
            })
            .state('app.linkedin', {
                templateUrl: 'partials/linkedin.html',
                url: '/linkedin'
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

function stackOverflowController(items, profile) {
    this.items = items.data.items;
    this.profile = profile.data.items[0];
    console.log(this.profile);
}

function githubController(repos) {
    this.repos = repos.data;
    console.log(this.repos);
}

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

function githubDataService($http) {
    var githubDataService = {};

    githubDataService.getRepos = function() {
        return $http.get('/repos');
    }

    return githubDataService;
}

})();