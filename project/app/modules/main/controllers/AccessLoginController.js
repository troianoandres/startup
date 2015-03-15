/**
 *  @name     AccessLoginController
 *  @depends  $scope
 *  @depends  TwitterService
 */
app.controller('AccessLoginController', [
  "$scope",
  "TwitterService",
  function($scope, TwitterService){

    /**
     *  @name         login
     *  @description  redirects the user to the oautio page for twitter login
     *  @return       {void}
     */
    this.login = function() {
      TwitterService.connectTwitter();
    };

  }
]);