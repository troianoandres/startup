var app = angular.module('app', [
  "ui.router",
  "ngCookies",
  "app.home",
  "app.trends",
  "app.people",
  "ngSanitize"
]);

app.constant('appKey', "YTdRujwGxLOyqmpnuJcth07m08c");

app.config([
  "$stateProvider", 
  "$urlRouterProvider",
  function($stateProvider, $urlRouterProvider) {

	  $urlRouterProvider.otherwise("/app/home");

    $stateProvider  		

      .state('access', {
        url: '/access',
        resolve: {
          logged: [
            "TwitterService",
            function(TwitterService) {

              TwitterService.initialize();

              if(TwitterService.isConnected()) {
                return true;
              } else {
                return false;
              }
            }
          ]
        },
        views: {
          "pageView": {
            templateUrl:  'modules/main/partials/access.html',
            controller:   "AccessController"
          }
        }
      })

      .state('access.login', {
        url: '/login',         
        views: {
          "contentView": {
            templateUrl:  'modules/main/partials/login.html',
            controller:   "AccessLoginController as login"
          }
        }
      })

      .state('access.callback', {
        url: '/callback',
        views: {
          "contentView": {
            templateUrl:  'modules/main/partials/loginCallback.html',
            controller:   "AccessLoginCallbackController as callback"
          }
        }
      })

      .state('app', {
        url: '/app',
        resolve: {
          logged: [
            "TwitterService",
            function(TwitterService) {

              TwitterService.initialize();

              if(!TwitterService.isConnected()) {
                return false;
              } else {
                return true;
              }
            }
          ]
        },           
        views: {
          "pageView": {
            templateUrl:  'modules/main/partials/index.html',
            controller:   "AppController"
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

      .state('app.blocked', {
        url: '/blocked',
        views: {
          "contentView": {
            templateUrl:  'modules/people/partials/blocked.html',
            controller:   "PeopleBlockedController as blocked"
          }
        }
      })

      /*
      .state('app.users', {
        url: '/users',
        views: {
          "contentView": {
            templateUrl:  'modules/users/partials/container.html',
            controller:   "HomeIndexController as index"
          }
        }
      })
      */
      /*
      .state('app.profile.timeline', {
        url: '/timeline',
        views: {
          "mainContentView": {
            templateUrl:  'modules/profile/partials/timeline.html',
            controller:   "ProfileTimelineController as timeline"
          }
        }
      })
      */

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

