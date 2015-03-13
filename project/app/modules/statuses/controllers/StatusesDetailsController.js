statusesModule.controller('StatusesDetailsController', [
  "$scope", 
  "$stateParams",
  "$filter",
  "TwitterService",
  "ErrorHandlerService",
  function($scope, $stateParams, $filter, TwitterService, ErrorHandlerService) {

    var that = this;

    this.tweet = null;
    this.loading = false;

    this.setTweet = function(tweet) {
      that.tweet = tweet;
      
      try {
        that.tweet.text = $filter("tweetLink")(that.tweet.text);            
      } catch (error) {
        console.log(error.message);
        ErrorHandlerService.displayError(error);  
      }
    };

    this.initialize = function() {

      TwitterService.initialize();

      that.loading = true;

      TwitterService.getStatus($stateParams.statusID)
        .then(that.setTweet,function(error) {
          ErrorHandlerService.displayError(error);
        })
        .finally(function() {
          that.loading = false;
        });

    };    

  }
]);