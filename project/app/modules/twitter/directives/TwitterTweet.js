twitterModule.directive('twitterTweet', [
  function(){
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      scope: {

      },
      controller: "TwitterTweetController as tweetCtrl",
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'A',
      // template: '',
      templateUrl: 'modules/twitter/partials/tweet.html',
      replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function($scope, iElm, iAttrs, controller) {
        
      }
    };
  }
]);