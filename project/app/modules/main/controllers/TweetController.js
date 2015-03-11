app.controller('TweetController', [
  "$scope",
  "$state",
  "$filter",
  function($scope, $state, $filter){

    this.tweet = $scope.tweet;

    this.tweet.text = $filter("linky")(this.tweet.text);
    this.tweet.text = $filter("tweetLink")(this.tweet.text);

    this.showTweetDetail = function(tweetID) {
      $state.go("app.statuses", {statusID: tweetID});
    };

  }
]);