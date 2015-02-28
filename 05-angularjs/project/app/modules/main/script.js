/**
 *  @name mainApp
 *  @description Main aplication module
 *  
 *  @type {[type]}
 */
var mainApp = angular.module('app', [
  "ui.router", 
  "app.movies",
  "app.access",
  "app.authentication",
  "app.directives",
  //"firebase",
  "ui.bootstrap"
]);

//mainApp.constant("firebaseURL", "https://bootcamp-movies-app.firebaseio.com/");

mainApp
  .config([
	  "$stateProvider", 
	  "$urlRouterProvider",
	  function($stateProvider, $urlRouterProvider) {

		  $urlRouterProvider.otherwise("/");

      $stateProvider  		
        .state('access', {
          url: '/access',
          views: {
            "pageView": {
              templateUrl:  'modules/access/partials/index.html'
            }
          }
        })

        .state('app', {
          url: '/app',
          /*
          resolve: {
            "currentAuth": [
              "AuthenticationFactory",           
              function(AuthenticationFactory) {
                return AuthenticationFactory.$requireAuth();
              }]
          },
          */
          views: {
            "pageView": {
              templateUrl:  'modules/main/partials/index.html'
            }
          }
        })

        .state('app.movies', {
          url: '/movies',
          /*
          resolve: {
            "currentAuth": [
              "Authentication",           
              function(Authentication) {
                return Authentication.$requireAuth();
              }]
          },
          */
          views: {
            "mainContentView": {
              templateUrl:  'modules/movies/partials/container.html',
              controller:   "MovieController"
            }
          }
        })

        .state('app.movies.index', {
          url: '/index',
          views: {
            "sectionContentView": {
              templateUrl: 'modules/movies/partials/index.html',
              controller: "MovieIndexController as miCtrl"
            }
          }
        })

        .state('app.movies.list', {
          url: '/list',
          views: {
            "sectionContentView": {
              templateUrl: 'modules/movies/partials/list.html',
              controller: "MovieListController as mlCtrl"
            }
          }
        })  


        ;

    }
  ]);

