angular.module('myfeed', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

		//$locationProvider.html5Mode(true);
    	$urlRouterProvider.otherwise('/home');
		$stateProvider
			.state('sj', {
            	abstract: true,
            	templateUrl: '/client/index.html',
    		})
    		.state('sj.home', {
    			url: '/home',
    			controller:'mainCtrl',
    			templateUrl: '/client/home.html'
    		})
    		.state('sj.stackoverflow', {
    			url: '/stackoverflow',
    			controller:'mainCtrl',
    			templateUrl: '/client/stackoverflow.html'
    		})
    		.state('sj.github', {
    			url: '/github',
    			controller:'githubCtrl',
    			templateUrl: '/client/github.html',
    		})

	}])
	.controller('mainCtrl', mainCtrl)
    .controller('githubCtrl', githubCtrl);


function mainCtrl($scope, $http, $sce) {
	$scope.name = "Sebastian";
	$scope.someData = [];

	$scope.getContentAsHtml = function(content) {
        return $sce.trustAsHtml(content);
    }

	$http.get('/stack')
		.success(function(response) {
			$scope.someData = response.items;
			console.log(response);

		})
		.error(function() {
			console.log("err");
		})
}

function githubCtrl($scope, $http) {
    $scope.repos = [];

    $http.get('/repos')
        .success(function(response) {
            console.log(response);
            $scope.repos = response;
        })
}