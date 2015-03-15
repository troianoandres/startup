trendsModule.directive('trend', [

  function(){
    
    return {
      scope: {
        trend: "=ngTrend"
      },
      controller: "TrendController as trendCtrl",      
      restrict: 'A',
      templateUrl: 'modules/trends/partials/trend.html',
      replace: true,
      link: function($scope, iElm, iAttrs, controller) {
        
      }
    };
  }
]);