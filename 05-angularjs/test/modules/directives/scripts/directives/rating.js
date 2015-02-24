angular.module("directives")
	.directive('tRating', [
		function(){
			return {
				// name: '',
				// priority: 1,
				// terminal: true,
				scope: {
					rating:     '=ngRating',
					maxRating: 	'@ngMax',
	        readOnly:   '@ngReadonly'
				},
				controller: "TRatingController",
				// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
				restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
				// template: '',
				 templateUrl: 'modules/directives/templates/rating.html',
				 replace: true,
				// transclude: true,
				// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
				link: function($scope, iElm, iAttrs, controller) {

					$scope.updateStars = function() {
						var index = 0;
	          $scope.stars = [];
						for (index = 0; index < $scope.maxRating; index++) {
							$scope.stars.push( {isFull: ($scope.rating > index) } );
						}
					};

					$scope.starClass = function(star, index) {
						var cssClass = 'fa-star-o';

						if (star.isFull) {
							cssClass = 'fa-star';
						}
						
						return cssClass;
					};

					$scope.$watch('rating', function(newValue, oldValue) {
						if (newValue !== null && newValue !== undefined) {
							$scope.updateStars();
						}
					});

				}
			};
		}
	]);