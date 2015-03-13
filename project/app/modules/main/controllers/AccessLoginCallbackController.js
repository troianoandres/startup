app.controller('AccessLoginCallbackController', [
  "$scope",
  "TwitterService",
  "$state",
  function($scope, TwitterService, $state){

    this.redirectHome = function() {
      $state.go("app.home.timeline");
    };

    this.redirectLogin = function() {
      $state.go("access.login");
    };

    TwitterService.connectionCallback()
      .then(this.redirectHome, this.redirectLogin);      

  }
]);