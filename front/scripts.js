(function() {
angular.module('myfeed', ['ui.router', 'ngProgress', 'ngAnimate'])
    .controller('mainCtrl', ['$scope', 'ngProgress', '$rootScope', mainCtrl])
    .controller('githubCtrl', githubCtrl)
    .controller('stackOverflowCtrl', stackOverflowCtrl)
    .controller('stackOverflowViewCtrl', stackOverflowViewCtrl)
    .service('GithubDataService', ['$http', GithubDataService])
    .factory('StackOverflowDataService', ['$http', '$q', StackOverflowDataService])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', mainConfig])

function mainConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        //$locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('sj', {
                abstract: true,
                template: '<div ui-view class="view-animate"></div>'
            })
            .state('sj.home', {
                url: '/home',
                controller:'mainCtrl',
                templateUrl: '/client/home.html'
            })
            .state('sj.stackoverflow', {
                url: '/stackoverflow',
                controller:'stackOverflowCtrl',
                templateUrl: '/client/stackoverflow.html',
                resolve: {
                    answers: function(StackOverflowDataService) {
                        return StackOverflowDataService.getData()
                        .then(function(response) {
                            return response.data.items;
                        })
                    }
                }
            })
            .state('sj.stackOverflowView', {
                url: '/stackoverflow/:id',
                controller:'stackOverflowViewCtrl',
                templateUrl: '/client/stackoverflow.view.html',
                resolve: {
                    item: function(StackOverflowDataService, $stateParams) {
                        var itemId = $stateParams.id;
                        return StackOverflowDataService.getItem(itemId);
                    }
                }
            })
            .state('sj.github', {
                url: '/github',
                controller:'githubCtrl',
                templateUrl: '/client/github.html',
                resolve: {
                    repos: function(GithubDataService) {
                        return GithubDataService.getRepos()
                        .then(function(response) {
                            return response.data;
                        })
                    }
                }
            })

    }

function StackOverflowDataService($http, $q) {
    var cache = null;

    StackOverflowDataService.getData = function() {
        return $http.get('/stack')
            .then(function(response) {
                cache = response.data.items;
                return response;
            })
    }

    StackOverflowDataService.getItem = function(itemId) {
        var deffered = $q.defer();

        angular.forEach(cache, function(i) {
            if(i.answer_id == itemId) {
                console.log("found")
                deffered.resolve(i);
            }
        })

        return deffered.promise;
    }

    return StackOverflowDataService;   
}
    
function GithubDataService($http) {
    this.getRepos = function() {
        return $http.get('/repos');
    }
}

function mainCtrl($scope, ngProgress, $rootScope) {
	

    $rootScope.$on('$stateChangeStart', function() {
        ngProgress.start();
    })
    $rootScope.$on('$stateChangeSuccess', function() {
        ngProgress.complete();
    })
}

function stackOverflowCtrl($scope, $sce,answers) {
    console.log(answers)
    $scope.name = "Sebastian";
    $scope.someData = answers;
    $scope.logMe = function() {
        console.log("asdasd")
    }

    $scope.getContentAsHtml = function(content) {
        return $sce.trustAsHtml(content);
    }
}

function stackOverflowViewCtrl($scope, $sce, item) {
    console.log(item);
    $scope.item = item;

    $scope.getContentAsHtml = function(content) {
        return $sce.trustAsHtml(content);
    }
}

function githubCtrl($scope, repos) {
    console.log(repos)
    $scope.repos = repos;
}

})();