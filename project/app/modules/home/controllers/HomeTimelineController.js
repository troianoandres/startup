homeModule.controller("HomeTimelineController", [
  "$scope",
  "TwitterService",
  "$q",
  "$document",
  function($scope, TwitterService, $q, $document){

    var q = $q,
        that = this,
        scope = $scope;

    that.filterBy = "";
    that.tweets = [];
    that.initialized = false;

    TwitterService.initialize();
    
    /*
    $scope
      .$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams){
          TwitterService.saveTweets("timeline", that.tweets);
        });
    */
    

    var initialize = function() {
      var deferred = q.defer();

      TwitterService.getTweets()
        .then(function(result) {
          storeTweets(result);
          console.log(result);
          deferred.resolve("ok");

        }, function(error) {
          console.log(error)

          deferred.reject("error");
        });

      return deferred.promise;
    };

    var storeTweets = function(tweets) {
      that.tweets = tweets;
    };

    initialize()
      .then(function() {
        that.initialized = true;
      }, function(){
        that.initialized = false;
      });  

  }
]);