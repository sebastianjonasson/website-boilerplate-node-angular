function stackOverflowQuestionsController(questions, profile, $sce) {
    var questions = questions.data.items;

    this.selectedItem;
    
    this.questions = angular.copy(questions);

    this.filterList = function(search) {
        this.questions = angular.copy(questions);
        var filteredItems=[];

        angular.forEach(angular.copy(this.questions), function(item) {
            if(item.title.indexOf(search) > -1 || item.body.indexOf(search) > -1) {
                filteredItems.push(item);
            };
        });

        this.questions = filteredItems;
    }

    this.getDate = function(date) {
        return new Date(date).toString();
    }
    
    this.getHtml = $sce.trustAsHtml;
    
}