angular.module('website', ['ui.router', 'ngProgress', 'ngAnimate'])
    .controller('mainCtrl', ['$scope','ngProgress','$rootScope', mainCtrl])
    .controller('stackOverflowController', ['items', 'profile', '$sce', stackOverflowController])
    .controller('githubController', ['repos', 'profile', githubController])
    .controller('linkedinController', ['profile', linkedinController])
    .factory('stackOverflowDataService', ['$http', stackOverflowDataService])
    .factory('githubDataService', ['$http',githubDataService])
    .factory('linkedInDataService', ['$http',linkedInDataService])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', router])


function mainCtrl($scope, ngProgress, $rootScope) {

    $rootScope.$on('$stateChangeStart', function() {
        ngProgress.start();
    })
    $rootScope.$on('$stateChangeSuccess', function() {
        ngProgress.complete();
    })
}