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

function stackOverflowController(items, profile, $sce) {
    var items = items.data.items;
    this.items = angular.copy(items);
    this.profile = profile.data.items[0];
    console.log(this.profile);
    this.getHtml = $sce.trustAsHtml;

    this.filterList = function(search) {
        this.items = angular.copy(items);
        var filteredItems=[];

        angular.forEach(angular.copy(this.items), function(item) {
            if(item.title.indexOf(search) > -1 || item.body.indexOf(search) > -1) {
                filteredItems.push(item);
            };
        });

        this.items = filteredItems;
    }

    this.getDate = function(date) {
        return new Date(date).toString();
    }
}

function githubController(repos, profile) {
    this.repos = repos.data;
    this.profile = profile.data;
    console.log(this.profile);
}

function linkedinController(profile) {
    this.profile = profile.data.person;
    console.log(this.profile);
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
        return $http.get('/github/repos');
    }

    githubDataService.getProfile = function() {
        return $http.get('/github/profile');
    }

    return githubDataService;
}

function linkedInDataService($http) {
    var linkedInDataService = {};

    linkedInDataService.getProfile = function() {
        return $http.get('/linkedin/profile');
    }

    return linkedInDataService;
}

})();