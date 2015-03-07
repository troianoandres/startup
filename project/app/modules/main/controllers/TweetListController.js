app.controller('TweetListController', [
  "$scope",
  "TwitterService",
  function($scope, TwitterService){
  
    var that = this,
        loadTweetsFunction = null;

    that.listTitle = $scope.listTitle;
    that.error = true;
    that.loading = false;
    that.hasNewTweets = false;    
    that.tweets = [];

    switch($scope.listSource) {
      case "home_timeline":
        loadTweetsFunction = function() {
          var parameters = {};

          that.loading = true;

          if(that.tweets.length) {
            parameters.max_id = that.tweets[that.tweets.length - 1].id;
          }

          TwitterService.getHomeTimeline(parameters)
            .then(function(result) {
              that.tweets = that.tweets.concat(result);
              that.loading = false;
            }, function(error) {
              that.loading = false;
            });

        };
        break;
    }

    TwitterService.initialize();

    loadTweetsFunction();

    $scope.loadNextTweets = function() {      
      loadTweetsFunction();      
    };

  }
]);
