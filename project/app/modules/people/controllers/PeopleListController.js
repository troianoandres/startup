peopleModule.controller('PeopleListController', [
  "$scope",
  "TwitterService",
  "ErrorHandlerService",
  function($scope, TwitterService, ErrorHandlerService) {
  
    var that = this;

    that.listTitle = $scope.listTitle;
    that.loading = false;
    that.people = [];

    that.initialize = function() {
      
      that.loading = true;

      TwitterService.getBlockedPeople()
        .then(function(result) {
          that.people = result.users;
        }, function(error) {
          ErrorHandlerService.displayError(error);
        })
        .finally(function() {
          that.loading = false;
        });

    };

  }
]);