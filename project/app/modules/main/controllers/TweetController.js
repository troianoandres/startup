app.controller('TweetController', [
  "$scope",
  "$state",
  "$filter",
  "ErrorHandlerService",
  function($scope, $state, $filter, ErrorHandlerService){

    this.tweet = $scope.tweet;

    this.initialize = function() {

      try {
        this.tweet.text = $filter("tweetLink")(this.tweet.text);
        this.tweet.created_at = $filter("twitterDate")(this.tweet.created_at);
      } catch (error) {
        ErrorHandlerService.displayError(error);
      }

    };

    this.showTweetDetail = function(tweetID) {
      if(!tweetID) {
        ErrorHandlerService.displayError(new Error("You can't see the details of a non identified tweet"));
      }

      $state.go("app.statuses", {statusID: tweetID});
    };

  }
]);