var app = angular.module("app", [
  "ui.router",
  "app.movies",
  "LocalStorageModule"
]);

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('movies-app')
    .setNotify(true, true);
});

app.config([
  "$stateProvider", 
  "$urlRouterProvider",
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/app/movies/index");

    $stateProvider      

        .state('app', {
          url: '/app',
          views: {
            "mainPageView": {
              templateUrl:  'modules/main/partials/container.html',
              controller:   "AppController as appCtrl"
            }
          }
        })

        .state('app.movies', {
          url: '/movies',
          views: {
            "sectionView": {
              templateUrl:  'modules/movies/partials/container.html'
            }
          }
        })

        .state('app.movies.index', {
          url: '/index',
          views: {
            "contentView": {
              templateUrl:  'modules/movies/partials/index.html',
              controller:   "MoviesIndexController as indexCtrl"
            }
          }
        })

        .state('app.movies.edit', {
          url: '/edit/:movieIMDB',
          views: {
            "contentView": {
              templateUrl:  'modules/movies/partials/edit.html',
              controller:   "MoviesEditController as editCtrl"
            }
          }
        })

        .state('app.movies.create', {
          url: '/create',
          views: {
            "contentView": {
              templateUrl:  'modules/movies/partials/create.html',
              controller:   "MoviesCreateController as createCtrl"
            }
          }
        });

    }
  ]);

