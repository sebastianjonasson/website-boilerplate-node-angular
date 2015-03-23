angular.module('website', ['ui.router', 'ngAnimate', 'ngMaterial', 'chart.js'])
    .controller('appController', ['profile', appController])
    .controller('stackOverflowItemsController', ['items', '$sce','$mdSidenav','$mdMedia', stackOverflowItemsController])
    .controller('stackOverflowProfileController', ['profile','activity','items','$state', stackOverflowProfileController])
    .controller('stackOverflowViewAnswerController', ['answer', '$sce', stackOverflowViewAnswerController])
    .controller('githubController', ['repos', 'profile', githubController])
    .controller('linkedinController', ['profile', linkedinController])
    .factory('stackOverflowDataService', ['$http','$q', stackOverflowDataService])
    .factory('githubDataService', ['$http',githubDataService])
    .factory('linkedInDataService', ['$http',linkedInDataService])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', router])


/*function mainCtrl($scope, ngProgress, $rootScope) {

    $rootScope.$on('$stateChangeStart', function() {
        ngProgress.start();
    })
    $rootScope.$on('$stateChangeSuccess', function() {
        ngProgress.complete();
    })
}*/