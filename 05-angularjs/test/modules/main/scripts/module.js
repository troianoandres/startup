/**
 *  @name mainApp
 *  @description Main aplication module
 *  
 *  @type {[type]}
 */
var mainApp = angular.module('mainApp', [
  "ui.router", 
  "moviesModule",
  "accessModule",
  "AuthenticationModule",
  "directives",
  "firebase",
  "ui.bootstrap"
]);

mainApp.constant("firebaseURL", "https://bootcamp-movies-app.firebaseio.com/");

mainApp
  .config([
	  "$stateProvider", 
	  "$urlRouterProvider",
    "firebaseURL",
	  function($stateProvider, $urlRouterProvider, firebaseURL) {

		  $urlRouterProvider.otherwise("/");

      $stateProvider  		
        .state('access', {
          url: '/access',
          views: {
            "pageView": {
              templateUrl:  'modules/access/views/index.html'
            }
          }
        })

        .state('app', {
          url: '/app',
          resolve: {
            "currentAuth": [
              "AuthenticationFactory",           
              function(AuthenticationFactory) {
                return AuthenticationFactory.$requireAuth();
              }]
          },
          views: {
            "pageView": {
              templateUrl:  'modules/main/views/index.html'
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
              templateUrl:  'modules/movies/views/container.html',
              controller:   "MovieController"
            }
          }
        })

        .state('app.movies.index', {
          url: '/index',
          views: {
            "sectionContentView": {
              templateUrl: 'modules/movies/views/index.html',
              controller: "MovieIndexController as miCtrl"
            }
          }
        })

        .state('app.movies.list', {
          url: '/list',
          views: {
            "sectionContentView": {
              templateUrl: 'modules/movies/views/list.html',
              controller: "MovieListController as mlCtrl"
            }
          }
        })  


        ;

    }
  ]);

