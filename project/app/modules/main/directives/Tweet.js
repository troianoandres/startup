app.directive('tweet', [
  function(){
    return {
      scope: {
        tweet: "=ngTweet"
      },
      controller: "TweetController as tweetCtrl",
      restrict: 'A',
      templateUrl: 'modules/main/partials/tweet.html',
      replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function($scope, iElm, iAttrs, controller) {
        
      }
    };
  }
]);