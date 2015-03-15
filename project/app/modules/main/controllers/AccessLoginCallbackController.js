/**
 *  @name     AccessLoginCallbackController
 *  @depends  $scope
 *  @depends  TwitterService                  Provide the connectionCallback promise after the redirect
 *  @depends  $state
 */
app.controller('AccessLoginCallbackController', [
  "$scope",
  "TwitterService",
  "$state",
  function($scope, TwitterService, $state){

    /**
     *  @name         rediretHome
     *  @description  redirects the user to the home timeline
     *  @return {void}
     */
    this.redirectHome = function() {
      $state.go("app.home.timeline");
    };

    /**
     *  @name         rediretLogin
     *  @description  redirects the user to the login page
     *  @return {void}
     */
    this.redirectLogin = function() {
      $state.go("access.login");
    };

    // catch the connectionCallback event
    TwitterService.connectionCallback()
      .then(this.redirectHome, this.redirectLogin);      

  }
]);