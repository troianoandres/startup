angular.module("directives")
	.controller('TRatingController', [
	  "$scope",
		function($scope){

	    $scope.rate = function(value) {
	      if(!$scope.readOnly){
	        $scope.rating = value;
	      }
	    }

	}]);