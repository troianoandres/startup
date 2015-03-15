/**
 *  @name     TweetController
 *
 *  @description                    Controller used into the Tweet directive
 * 
 *  @depends  $scope    
 *  @depends  $state                Instance of $state to redirect the user if needed
 *  @depends  $filter               Instance of $filter to apply any filter provided
 *  @depends  ErrorHandlerService   Service to handle error
 */
app.controller('TweetController', [
  "$scope",
  "$state",
  "$filter",
  "ErrorHandlerService",
  function($scope, $state, $filter, ErrorHandlerService){

    // Set into the controller as statement the provided tweet into the directive
    this.tweet = $scope.tweet;

    /**
     *  @name   initialize    
     *
     *  @description                Method called when the directive is initialized with ng-init
     *                              will initialize and format the tweet text and the tweet created date
     */ 
    this.initialize = function() {

      try {
        
        // Format the text of the tweet for mentions and hashtags
        this.tweet.text = $filter("tweetLink")(this.tweet.text);

        // Format the date with moment.js to get the fromNow time
        this.tweet.created_at = $filter("twitterDate")(this.tweet.created_at);
      } catch (error) {
        ErrorHandlerService.displayError(error);
      }

    };

    /**
     *  @name   showTweetDetail
     *  @param  {String}  tweetID   id for the tweet to search for
     */
    this.showTweetDetail = function(tweetID) {
      
      // tweetID should be provided if not will throw an error
      if(!tweetID) {
        ErrorHandlerService.displayError(new Error("You can't see the details of a non identified tweet"));
      }

      // redirect to the statuses page with the statusID provided
      $state.go("app.statuses", {statusID: tweetID});
    };

  }
]);