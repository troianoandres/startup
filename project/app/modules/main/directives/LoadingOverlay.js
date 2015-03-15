app.directive('loadingOverlay', [
  function(){
  
  return {
    scope: { },
    controller: "LoadingOverlayController as loadingCtrl",
    restrict: 'A',
    templateUrl: 'modules/main/partials/loadingOverlay.html',
    replace: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {

    }
  };
}]);