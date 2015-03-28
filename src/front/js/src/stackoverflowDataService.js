function stackOverflowDataService($http, $q) {
    var stackOverflowDataService = {},
        answersCache,
        questionsCache;

    stackOverflowDataService.getData = function() {
        return $http.get('/stackoverflow/answers')
        	.then(function(answers) {
        		answersCache = answers;
        		return answers;
        	})
    }

    stackOverflowDataService.getQuestions = function() {
        var url = '/stackoverflow/questions';
        return $http.get(url)
            .then(function(questions) {
                questionsCache = questions;
                return questions;
            })
    }

    stackOverflowDataService.getQuestion = function(id) {
        var question;
        angular.forEach(questionsCache.data.items, function(q) {
          if(q.question_id == id) {
            question = q;
          }
        })
        return question;
    };

    stackOverflowDataService.getProfile = function() {
        return $http.get('/stackoverflow/profile');
    }

    stackOverflowDataService.getAnswer = function(id) {
        var answer;
        angular.forEach(answersCache.data.items, function(a) {
        	if(a.answer_id == id) {
        		answer = a;
        	}
        })
        return answer;
    };

    stackOverflowDataService.getActivity = function() {
        return $http.get('/stackoverflow/activity')
                    .then(function(response) {
                      console.log(response);
                      return convertActivityData(response.data.items);
                    });
    }


    var convertActivityData = function(activites) {
      console.log(activites);
        var deffered = $q.defer(),
            datas = {},
            activityLables = [],
            acitivityData = [];

    
        angular.forEach(activites, function(a) {
                if(datas.hasOwnProperty(a.activity_type)) {
                    datas[a.activity_type]++;
                } else {
                    datas[a.activity_type] = 1;
                }
        })
        angular.forEach(datas, function(key, value) {
            activityLables.push(value);
            acitivityData.push(key);
        })
        var a = {
            labels: activityLables,
            data: acitivityData
        };
        deffered.resolve(a);

        return deffered.promise;
    }


    return stackOverflowDataService;
}