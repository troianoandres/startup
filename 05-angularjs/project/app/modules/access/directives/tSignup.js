angular.module('app.access')
  .directive('tSignup', [
    function(){
    return {
      // priority: 1,
      scope: {

      },
      controller: "TSignupController as ctrl",
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'A',
      templateUrl: 'modules/access/partials/tSignup.html',
      replace: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function($scope, iElm, iAttrs, controller) {
        
        $scope.data = {
          name:             "",
          email:            "",
          password:         "",
          confirmPassword:  "",
          username:         ""
        };

        $scope.showError = function(errorMessage) {
          console.log(errorMessage);
        };

      }
    };
  }]);