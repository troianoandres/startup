app.controller('TweetListController', [
  "$scope",
  "TwitterService",
  function($scope, TwitterService){
  
    var that = this;
    
    this.directive = {
      title: $scope.title,
      source: $scope.source,
      query: $scope.query,
      error: false,
      loading: false,
      tweets: []
    };

    this.loadHomeTimeline = function() {
      var parameters = {};

      that.directive.loading = true;

      if(that.directive.tweets.length) {
        parameters.max_id = that.directive.tweets[that.directive.tweets.length - 1].id;
      }

      TwitterService.getHomeTimeline(parameters)
        .then(
          function(result) {
            that.directive.tweets = that.directive.tweets.concat(result);
          }, function(error) {
            console.log(error);
          }
        )
        .finally(function() {
          that.directive.loading = false;
        });
    };

    this.loadTrendTimeline = function() {
      var parameters = {
        q: that.directive.query
      };

      that.directive.loading = true;

      if(that.directive.tweets.length) {
        parameters.max_id = that.directive.tweets[that.directive.tweets.length - 1].id;
      }

      TwitterService.getTweetsByQuery(parameters)
        .then(
          function(result) {
            that.directive.tweets = that.directive.tweets.concat(result.statuses);
          }, function(error) {
            console.log(error);
          }
        )
        .finally(function() {
          that.directive.loading = false;
        });
    };

    this.initialize = function() {

      TwitterService.initialize();

      that.loadTweets();
    }; 

    this.loadTweets = function() {
      
      switch(that.directive.source) {
        case "home_timeline":
          that.loadHomeTimeline();
          break;
        case "trend_timeline": 
          that.loadTrendTimeline();
          break;
      }

    };

  }
]);
