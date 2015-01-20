(function() {
angular.module('website', ['ui.router', 'ngProgress', 'ngAnimate'])
    .controller('mainCtrl', mainCtrl)
    .controller('stackOverflowController', stackOverflowController)
    .factory('stackOverflowDataService', stackOverflowDataService)
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
                    }
                }
            })
            .state('app.github', {
                templateUrl: 'partials/github.html',
                url: '/github'
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

function stackOverflowController(items) {
    this.items = items;
}

function stackOverflowDataService($http) {
    var stackOverflowDataService = {};

    stackOverflowDataService.getData = function() {

        return $http.get('/stack');
    }

    return stackOverflowDataService;
}

})();