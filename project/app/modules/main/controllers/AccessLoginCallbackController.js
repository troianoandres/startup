app.controller('AccessLoginCallbackController', [
  'TwitterService',
  "$state",
  function(TwitterService, $state){

    TwitterService.connectionCallback()
      .then(function(result) {
        $state.go("app.home.timeline");
      }, function(error) {
        console.log(error);
      });

  }
]);