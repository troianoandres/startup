trendsModule.controller('TrendTimelineController', [
  "$scope",
  "$stateParams",
  "TwitterService",
  function($scope, $stateParams, TwitterService){
  
    var that = this;

    this.tweetListConfig = {
      query: $stateParams.trendQuery,
      title: "Tweets for the selected trend",
      source: "trend_timeline"
    };

  }
]);