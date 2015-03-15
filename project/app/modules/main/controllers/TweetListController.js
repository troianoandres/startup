/**
 *  @name     TweetListController
 *
 *  @description                            Controller to use into the tweetlist directive
 * 
 *  @depends  $scope
 *  @depends  TwitterService                Instance used to access the tweets from the twitter api
 *  @depends  ErrorHandlerService           Instance to handle the errors
 */
app.controller('TweetListController', [
  "$scope",
  "TwitterService",
  "ErrorHandlerService",
  function($scope, TwitterService, ErrorHandlerService){
  
    var that = this;
    
    // Configuration for the directive
    this.directive = {
      title: $scope.title,
      source: $scope.source,
      query: $scope.query,
      error: false,
      loading: false,
      tweets: []
    };

    /**
     *  @name   loadHomeTimeline
     *  @description     Load the tweets array with home timeline tweets for the user
     */
    this.loadHomeTimeline = function() {
      var parameters = {};

      // Set the directive.loading to make the loading spinner spawns
      that.directive.loading = true;

      // if some tweets are already loaded will get the max id of the previous array to get tweets from there
      if(that.directive.tweets.length) {
        parameters.max_id = that.directive.tweets[that.directive.tweets.length - 1].id;
      }

      // Try to get the tweets with the TwitterService instance
      TwitterService.getHomeTimeline(parameters)
        .then(
          function(result) {
            that.directive.tweets = that.directive.tweets.concat(result);
          }, function(error) {
            ErrorHandlerService.displayError(error);
          }
        )
        .finally(function() {
          that.directive.loading = false;
        });
    };

    /**
     *  @name     loadTrendTimeline
     *  @description      Load the tweets array with trend specific timeline
     */
    this.loadTrendTimeline = function() {
      var parameters = {
        q: that.directive.query
      };

      // Set the directive.loading to make the loading spinner spawns
      that.directive.loading = true;

      // if some tweets are already loaded will get the max id of the previous array to get tweets from there
      if(that.directive.tweets.length) {
        parameters.max_id = that.directive.tweets[that.directive.tweets.length - 1].id;
      }

      // Try to get the tweets with the TwitterService instance
      TwitterService.getTweetsByQuery(parameters)
        .then(
          function(result) {
            that.directive.tweets = that.directive.tweets.concat(result.statuses);
          }, function(error) {
            ErrorHandlerService.displayError(error);
          }
        )
        .finally(function() {
          that.directive.loading = false;
        });
    };

    /**
     *  @name     initialize
     *  @description    called when ng-init is called, will initialize the TwitterService if needed and then it will call 
     *                  loadTweets method
     */
    this.initialize = function() {

      TwitterService.initialize();

      that.loadTweets();
    }; 

    /**
     *  @name     loadTweets
     *  @description    will call the method that is related to the type of timeline that is currently initialized
     */
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
