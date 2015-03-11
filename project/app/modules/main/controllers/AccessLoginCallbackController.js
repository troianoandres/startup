app.controller('AccessLoginCallbackController', [
  "$scope",
  "TwitterService",
  "$state",
  function($scope, TwitterService, $state){

    TwitterService.connectionCallback()
      .then(function(result) {
        $state.go("app.home.timeline");
      }, function(error) {
        console.log(error);
      });

  }
]);