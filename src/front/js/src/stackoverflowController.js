function stackOverflowController(items, profile, $sce, $mdSidenav, $mdMedia) {
    var items = items.data.items;

    this.selectedItem;
    
    this.items = angular.copy(items);
    this.profile = profile.data.items[0];

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

    this.getDate = function(date) {
        return new Date(date).toString();
    }
    
    this.getHtml = $sce.trustAsHtml;

    this.close = function() {
        $mdSidenav('asd').close()
          .then(function(){
            console.log("close LEFT is done");
          });
    };

    this.open = function() {
        $mdSidenav('asd').toggle();
    }

    this.$mdMedia = $mdMedia;

    this.viewEntry = function(entry) {
        this.selectedItem = entry;
        $mdSidenav('asd').close();
    }

    this.goBack = function() {
        this.selectedItem = undefined;
        $mdSidenav('asd').toggle();
    }
    
}