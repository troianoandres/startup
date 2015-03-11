peopleModule.controller('PeopleListController', [
  "$scope",
  "TwitterService",
  function($scope, TwitterService){
  
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
          console.log(error);
        })
        .finally(function() {
          that.loading = false;
        });

    };

  }
]);