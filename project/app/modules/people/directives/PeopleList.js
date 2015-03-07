peopleModule.directive('peopleList', [

  function(){
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      scope: {
        listTitle: "@ngListTitle",
        listSource: "@ngListSource"
      },
      controller: "PeopleListController as peopleListCtrl",
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      templateUrl: 'modules/people/partials/peopleList.html',
      replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function($scope, iElm, iAttrs, controller) {
        
      }
    };
  }
]);