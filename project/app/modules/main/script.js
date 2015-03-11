var app = angular.module('app', [
  "ui.router",
  "ngCookies",
  "app.home",
  "app.trends",
  "app.people",
  "app.statuses",
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
            templateUrl:  'modules/main/partials/container.html',
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
            controller:   "HomeTimelineController as timelineCtrl"
          }
        }
      })

      .state("app.statuses", {
        url:  "/statuses/:statusID",
        views: {
          "contentView": {
            templateUrl:  'modules/statuses/partials/details.html',
            controller:   "StatusesDetailsController as detailsCtrl"
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

      .state('app.trends', {
        url: '/trends',
        views: {
          "contentView": {
            templateUrl:  'modules/trends/partials/container.html',
            controller:   function() {
              
            }
          }
        }
      })

      .state('app.trends.top', {
        url: '/top',
        views: {
          "mainContentView": {
            templateUrl:  'modules/trends/partials/index.html',
            controller:   "TrendsIndexController as indexCtrl"
          }
        }
      })

      .state('app.trends.timeline', {
        url: '/:trendQuery',
        views: {
          "mainContentView": {
            templateUrl:  'modules/trends/partials/timeline.html',
            controller:   "TrendTimelineController as timelineCtrl"
          }
        }
      });

  }
]);

