/**
 *  @name     StatusesDetailsController
 *
 *  @description                            Controller used into the status details view
 *
 *  @depends     $scope
 *  @depends     $stateParams
 *  @depends     $filter
 *  @depends     TwitterService
 *  @depends     ErrorHandlerService
 */
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

    /**
     *  @name   setTweet
     *  @description                        Set the retrieved tweet item into the tweet attribute of the controller
     *  @param  {Object}  tweet
     */
    this.setTweet = function(tweet) {
      that.tweet = tweet;
      
      try {

        // Format the tweet item text to replace hashtags & mentions
        that.tweet.text = $filter("tweetLink")(that.tweet.text);            
      } catch (error) {
        console.log(error.message);
        ErrorHandlerService.displayError(error);  
      }
    };

    /**
     *  @name   initialize
     *  @description                        Initialize the current view with the status data 
     */
    this.initialize = function() {

      TwitterService.initialize();

      that.loading = true;

      // Get the status related with the statusID provided
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