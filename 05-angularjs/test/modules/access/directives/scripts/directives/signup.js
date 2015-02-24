angular.module('accessModule')
	.directive('signup', [
		function(){
		return {
			// priority: 1,
			scope: {

			},
			controller: "SignupController as ctrl",
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'A',
			templateUrl: 'modules/access/directives/templates/signup.html',
			replace: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				
				$scope.data = {
					name: 	          "",
					email:            "",
          password:         "",
          confirmPassword:  "",
          username: 				""
				};

				$scope.showError = function(errorMessage) {
					console.log(errorMessage)
				};

			}
		};
	}]);