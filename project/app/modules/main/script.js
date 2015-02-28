var mainApp = angular.module('app', [
  "ui.router", 
  "app.home",
  "app.trends",
  "app.profile"
]);

mainApp
  .config([
	  "$stateProvider", 
	  "$urlRouterProvider",
	  function($stateProvider, $urlRouterProvider) {

		  $urlRouterProvider.otherwise("/app/home");

      $stateProvider  		

        .state('app', {
          url: '/app',
          views: {
            "pageView": {
              templateUrl:  'modules/main/partials/index.html'
            }
          }
        })

        .state('app.home', {
          url: '/home',
          views: {
            "contentView": {
              templateUrl:  'modules/home/partials/container.html',
              controller:   "HomeIndexController as index"
            }
          }
        })
        
        .state('app.home.timeline', {
          url: '/timeline',
          views: {
            "mainContentView": {
              templateUrl:  'modules/home/partials/timeline.html',
              controller:   "HomeTimelineController as timeline"
            }
          }
        })

        .state('app.profile', {
          url: '/profile',
          views: {
            "contentView": {
              templateUrl:  'modules/profile/partials/container.html',
              controller:   "ProfileIndexController as index"
            }
          }
        })

        .state('app.profile.timeline', {
          url: '/timeline',
          views: {
            "mainContentView": {
              templateUrl:  'modules/profile/partials/timeline.html',
              controller:   "ProfileTimelineController as timeline"
            }
          }
        })

        .state('app.trends', {
          url: '/trends',
          views: {
            "contentView": {
              templateUrl:  'modules/home/partials/container.html',
              controller:   "HomeController as home"
            }
          }
        });

    }
  ]);

