statusesModule.controller('StatusesDetailsController', [
  "$scope", 
  "$stateParams",
  "$filter",
  "TwitterService",  
  function($scope, $stateParams, $filter, TwitterService){
  
    var that = this;

    this.tweet = null;
    this.loading = false;

    this.initialize = function() {

      that.loading = true;

      TwitterService.getStatus($stateParams.statusID)
        .then(
          function(result) {

            that.tweet = result;
            that.tweet.text = $filter("linky")(that.tweet.text);
            that.tweet.text = $filter("tweetLink")(that.tweet.text);            

          }, 
          function(error) {

          }
        )
        .finally(function() {
          that.loading = false;
        });

    };

    TwitterService.initialize();

  }
]);