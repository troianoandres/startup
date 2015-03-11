app.controller('AccessLoginController', [
  "$scope",
  "TwitterService",
  function($scope, TwitterService){

    this.login = function() {
      TwitterService.connectTwitter();
    };

  }
]);