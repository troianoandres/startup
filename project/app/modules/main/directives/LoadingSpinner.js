app.directive('loadingSpinner', [
  function(){
    
    return {
      scope: { },
      restrict: 'AE',
      template: '  <div class="circle"></div>',
      replace: true,
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