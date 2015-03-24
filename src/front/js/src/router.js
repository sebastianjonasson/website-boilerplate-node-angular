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
        },
        resolveStackoverflowAnswer = function(stackOverflowDataService, $stateParams) {
            var answerId = $stateParams.answerId;
            return stackOverflowDataService.getAnswer(answerId);
        },
        resolveStackoverflowActivity = function(stackOverflowDataService) {
            return stackOverflowDataService.getActivity()
                .then(function(data) {
                    return data;
                })
        },
        resolveStackoverflowQuestions = function(stackOverflowDataService) {
            return stackOverflowDataService.getQuestions();
        },
        resolveStackoverflowQuestion = function(stackOverflowDataService, $stateParams) {
            var id = $stateParams.questionId;
            return stackOverflowDataService.getQuestion(id);
        }

    //$locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/linkedin/profile');
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
                profile: ['linkedInDataService', resolveLinkedinProfile]
            }
        })
        .state('app.home', {
            templateUrl: 'partials/home.html',
            url: '/home'
        })
        .state('app.stackoverflow', {
            url: '/stackoverflow',
            template:'<div ui-view></div>',
            resolve: {
                items: ['stackOverflowDataService',resolveStackoverflowItems],
                profile: ['stackOverflowDataService', resolveStackoverflowProfile],
                activity: ['stackOverflowDataService', resolveStackoverflowActivity],
                questions: ['stackOverflowDataService', resolveStackoverflowQuestions]
            }
        })
        .state('app.stackoverflow.answers', {
            templateUrl: 'partials/stackoverflow-items.html',
            url: '/answers',
            controller: 'stackOverflowItemsController as soCtrl'
        })
        .state('app.stackoverflow.questions', {
            templateUrl: 'partials/stackoverflow-questions.html',
            url: '/questions',
            controller: 'stackOverflowQuestionsController as soCtrl'
        })
        .state('app.stackoverflow.viewanswer', {
            templateUrl: 'partials/stackoverflow-view-answer.html',
            url: '/item/:answerId',
            controller: 'stackOverflowViewAnswerController as so',
            resolve: {
                answer: ['stackOverflowDataService', '$stateParams', resolveStackoverflowAnswer]
            }
        })
        .state('app.stackoverflow.viewquestion', {
            templateUrl: 'partials/stackoverflow-view-question.html',
            url: '/questions/:questionId',
            controller: 'stackOverflowViewQuestionController as so',
            resolve: {
                question: ['stackOverflowDataService', '$stateParams', resolveStackoverflowQuestion]
            }
        })
        .state('app.stackoverflow.profile', {
            templateUrl: 'partials/stackoverflow-profile.html',
            url: '/profile',
            controller: 'stackOverflowProfileController as so'
        })
        .state('app.github', {
            templateUrl: 'partials/github.html',
            url: '/github',
            controller: 'githubController as git',
            resolve: {
                repos: ['githubDataService', resolveGithubRepos]
            }
        })
        .state('app.linkedin', {
            templateUrl: 'partials/linkedin.html',
            url: '/linkedin/profile',
            controller:'linkedinController as li'
        })
}