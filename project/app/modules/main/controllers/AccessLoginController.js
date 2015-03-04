angular.module("app").controller('AccessLoginController', [
  "TwitterService",
  "$state",
  function(TwitterService, $state){

    this.login = function() {
      TwitterService.connectTwitter();
    };

  }
]);