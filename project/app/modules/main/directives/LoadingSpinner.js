app.directive('loadingSpinner', [
  function(){
    // Runs during compile
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      scope: {

      },
      // controller: function($scope, $element, $attrs, $transclude) {},
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
       template: '  <div class="circle"></div>',
      // templateUrl: '',
      replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function($scope, iElm, iAttrs, controller) {
        var loadingCircle = angular.element(iElm);
        var parent = angular.element(iElm).parent();

        var center = function(loading, parent) {          
          var marginTop = (parent[0].offsetHeight - loading[0].offsetHeight) / 2;

          loading.css({
            "margin-top": marginTop + "px"
          });          
        };

        var parentHeight = function() {
          return parent[0].offsetHeight;
        };

        $scope.$watch(parentHeight, function() {
          center(loadingCircle, parent);
        });

      }
    };
  }
]);