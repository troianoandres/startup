homeModule.controller("HomeTimelineController", [
  "$scope",
  "TwitterService",
  function($scope, TwitterService){

    var scope = this;

    scope.tweets = [];

    TwitterService.initialize();

    var connectTwitter = function() {
      
      TwitterService.connectTwitter().then(getTweets, function(error) {
        console.log(error);
      });

    };

    var getTweets = function() {

      TwitterService.getTweets().then(function(result) {
        
        saveTweets(result);

      });

    };

    var saveTweets = function(tweets) {
      scope.tweets = tweets;
    };

    connectTwitter();

  }
]);