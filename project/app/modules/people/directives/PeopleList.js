peopleModule.directive('peopleList', [

  function(){
    return {
      scope: {
        listTitle: "@ngListTitle",
        listSource: "@ngListSource"
      },
      controller: "PeopleListController as peopleListCtrl",
      restrict: 'A',
      templateUrl: 'modules/people/partials/peopleList.html',
      replace: true,
      link: function($scope, iElm, iAttrs, controller) {
        
      }
    };
  }
]);