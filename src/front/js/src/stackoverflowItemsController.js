function stackOverflowItemsController(items, profile, $sce, $mdSidenav, $mdMedia) {
    var items = items.data.items;
    this.selectedItem;
    this.items = angular.copy(items);

    this.filterList = function(search) {
        this.items = angular.copy(items);
        var filteredItems=[];

        angular.forEach(angular.copy(this.items), function(item) {
            if(item.title.indexOf(search) > -1 || item.body.indexOf(search) > -1) {
                filteredItems.push(item);
            };
        });

        this.items = filteredItems;
    }
    this.getHtml = $sce.trustAsHtml;
    this.unescape = function(input) {
        return input.replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(n); })
    }
    this.getDate = function(timestamp) {
        var millsec = (parseInt(timestamp)) * 1000;
        return new Date(millsec).toDateString();
    }
    
}