angular.module('website', ['ui.router', 'ngProgress', 'ngAnimate'])
    .controller('mainCtrl', mainCtrl)
    .controller('stackOverflowController', stackOverflowController)
    .controller('githubController', githubController)
    .controller('linkedinController', linkedinController)
    .factory('stackOverflowDataService', stackOverflowDataService)
    .factory('githubDataService', githubDataService)
    .factory('linkedInDataService', linkedInDataService)
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', router])


function mainCtrl($scope, ngProgress, $rootScope) {

    $rootScope.$on('$stateChangeStart', function() {
        ngProgress.start();
    })
    $rootScope.$on('$stateChangeSuccess', function() {
        ngProgress.complete();
    })
}