trendsModule.controller('TrendController', [
  "$scope",
  "$state",
  function($scope, $state){
  
    var that = this;

    that.trend = $scope.trend;

    that.showTrendTimeline = function() {
      $state.go("app.trends.timeline", {trendQuery: that.trend.query});
    };

  }
]);