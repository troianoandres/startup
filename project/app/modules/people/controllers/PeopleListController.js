/**
 *  @name   PeopleListController
 *
 *  @description                    Controller related to the PeopleList directive
 * 
 *  @depends  $scope
 *  @depends  TwitterService
 *  @depends  ErrorHandlerService
 */
peopleModule.controller('PeopleListController', [
  "$scope",
  "TwitterService",
  "ErrorHandlerService",
  function($scope, TwitterService, ErrorHandlerService) {
  
    var that = this;

    // Main config for tge directive
    that.listTitle = $scope.listTitle;
    that.loading = false;
    that.people = [];

    /**
     *  @name initialize
     *  @description                  called into ng-init of the PeopleList directive
     */
    that.initialize = function() {

      that.loading = true;

      // Get the blocked people from the api
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