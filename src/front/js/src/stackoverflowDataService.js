function stackOverflowDataService($http) {
    var stackOverflowDataService = {};

    var answersCache;

    stackOverflowDataService.getData = function() {
        return $http.get('/stackoverflow/items')
        	.then(function(answers) {
        		answersCache = answers;
        		return answers;
        	})
    }

    stackOverflowDataService.getProfile = function() {
        return $http.get('/stackoverflow/profile');
    }

    stackOverflowDataService.getAnswer = function(id) {
    	console.log("enters");
        var answer;
        console.log(answersCache)
        angular.forEach(answersCache.data.items, function(a) {
        	console.log(a);
        	if(a.answer_id == id) {
        		console.log("has match");
        		answer = a;
        	}
        })
        return answer;
    };


    return stackOverflowDataService;
}