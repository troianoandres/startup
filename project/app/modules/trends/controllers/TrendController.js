/**
 *  @name     TrendController
 *
 *  @description                    Controller used into the trend directive
 * 
 *  @depends  $scope
 *  @depends  $state
 */
trendsModule.controller('TrendController', [
  "$scope",
  "$state",
  function($scope, $state){
  
    var that = this;

    that.trend = $scope.trend;

    /**
     *  @name     showTrendTimeline
     *  @description                  redirects the user to the trend timeline
     */
    that.showTrendTimeline = function() {
      $state.go("app.trends.timeline", {trendQuery: that.trend.query});
    };

  }
]);