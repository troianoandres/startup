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
              controller: "MainController as main"
      		  }
          }
        })

        .state('movies', {
          url: '/movies',
          views: {
            "mainContentView": {
              templateUrl: 'modules/movies/views/index.html',
              controller: "MovieListController as mlCtrl"
            }
          }
        })

        ;

    }
  ]);

