/**
 *  @name mainApp
 *  @description Main aplication module
 *  
 *  @type {[type]}
 */
var mainApp = angular.module('mainApp', [
  "ui.router", 
  "LocalStorageModule",
  "moviesModule"
]);


mainApp
  .config([
	  "$stateProvider", 
	  "$urlRouterProvider",
    "localStorageServiceProvider",
	  function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
	
      localStorageServiceProvider.setPrefix('textMainApp');

		  $urlRouterProvider.otherwise("/");

      $stateProvider  		
  		  .state('index', {
          url: '/',
          views: {
            "mainContentView": {
      		    templateUrl: 'modules/main/views/index.html',
              controller: "MainController"
      		  }
          }
        });

    }
  ]);

mainApp.controller('MainController', ['$scope', 'MovieCollection', function($scope, MovieCollection){
	
  $scope.set = function() {
    MovieCollection.set([{title:"asd"},{title:"aaa"}]);
  };

  $scope.get = function() {
    console.log(MovieCollection.get());
  };

}]);