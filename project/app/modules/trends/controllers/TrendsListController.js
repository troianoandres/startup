trendsModule.controller('TrendsListController', [
  '$scope', 
  "TwitterService",
  "ErrorHandlerService",
  function($scope, TwitterService, ErrorHandlerService){
  
    var that = this;

    that.loading = false;
    that.listTitle = $scope.listTitle;
    that.trends = [];

    this.initialize = function() {
      that.loading = true;

      TwitterService.getNearestTrends()
        .then(function(result) {

          that.trends = result.trends;          

        }, function(error) {

          ErrorHandlerService.displayError(error);

        })
        .finally(function() {
          that.loading = false;
        });
    };

  }
]);