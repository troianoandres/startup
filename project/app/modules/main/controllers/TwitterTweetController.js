app.controller('TwitterTweetController', [
  "$scope",
  "$state",
  function($scope, $state){
    
    var state = $state;

    this.tweet = $scope.tweet;

    this.showTweetDetail = function() {
      alert();
    };

    this.showUserProfile = function() {
      state.go("app.tweet.show");
    };    

  }
]);