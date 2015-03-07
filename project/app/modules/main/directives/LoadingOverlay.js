app.directive('loadingOverlay', [
  function(){
  
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {

    },
    controller: "LoadingOverlayController as loadingCtrl",
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    templateUrl: 'modules/main/partials/loadingOverlay.html',
    replace: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {

    }
  };
}]);