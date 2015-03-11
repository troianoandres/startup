trendsModule.controller('TrendsListController', [
  '$scope', 
  "TwitterService",
  function($scope, TwitterService){
  
    var that = this;

    that.loading = true;
    that.listTitle = $scope.listTitle;
    that.trends = [];


    var initialize = function() {
      TwitterService.getNearestTrends()
        .then(function(result) {

          console.log(result);

          that.trends = result.trends;
          that.loading = false;

        }, function(error) {

          console.log(error);

        });
    };

    initialize();

  }
]);