app.directive('tweetList', [
  "$document",
  function($document){
    return {
      name: 'tweetList',
      // priority: 1,
      // terminal: true,
      scope: {
        title: "=ngTitle",
        source: "=ngSource",
        query: "=ngQuery"
      },
      controller: "TweetListController as tweetListCtrl",
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'A',
      templateUrl: 'modules/main/partials/tweetList.html',
      replace: true,
      link: function($scope, iElm, iAttrs, controller) {

        var pageViewElement = angular.element($document[0].body).children().children().eq(1).children().eq(0);

        pageViewElement.bind("scroll", function(event) {        

          if( (this.offsetHeight + this.scrollTop - this.scrollHeight + 1.3) >= 0) {
            $scope.tweetListCtrl.loadTweets();
            $scope.$apply();
          }

        });

      }
    };
  }
]);