trendsModule.directive('trendsList', [

  function(){
    
    return {
      scope: {
        listTitle: "@ngListTitle"
      },
      controller: "TrendsListController as trendsListCtrl",
      restrict: 'A',
      templateUrl: 'modules/trends/partials/trendsList.html',
      replace: true,
      link: function($scope, iElm, iAttrs, controller) {
        
      }
    };
  }
]);