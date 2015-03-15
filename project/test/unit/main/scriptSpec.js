describe('core.states.app spec', function () {

  var $rootScope = null, $injector = null, $state = null;

  beforeEach(function() {

    // Mock the main module dependencies
    angular.mock.module("ui.router");
    angular.mock.module("ui.bootstrap");
    angular.mock.module("ngCookies");
    angular.mock.module("ngSanitize");
    angular.mock.module("app.home");
    angular.mock.module("app.trends");
    angular.mock.module("app.people");
    angular.mock.module("app.statuses");

    // Retrieve the main module
    module("app");    

    inject(function(_$rootScope_, _$state_, _$injector_, $templateCache) {

      $rootScope = _$rootScope_;
      $injector = _$injector_;
      $state = _$state_;

      $templateCache.put("app/modules/main/partials/container.html", "");
      $templateCache.put("app/modules/main/partials/access.html", "");
      $templateCache.put("app/modules/main/partials/login.html", "");
      $templateCache.put("app/modules/main/partials/loginCallback.html", "");
      $templateCache.put("app/modules/home/partials/container.html", "");

    });


  });

  describe('access', function() {
    var state = 'access';
      
    it('configuration test', function() {
        
        var config = $state.get(state);

        expect(config.views.pageView).not.toEqual(undefined);
        expect(config.views.pageView.templateUrl).toEqual("modules/main/partials/access.html");
        expect(config.views.pageView.controller).toEqual("AccessController");        
        expect(config.url).toEqual("/access");
        expect($state.href(state)).toEqual('#/access');        
        
    });
  
  });

  describe('access.login', function() {
    var state = 'access.login';
      
    it('configuration test', function() {
        
        var config = $state.get(state);

        expect(config.views.contentView).not.toEqual(undefined);
        expect(config.views.contentView.templateUrl).toEqual("modules/main/partials/login.html");
        expect(config.views.contentView.controller).toEqual("AccessLoginController as login");        
        expect(config.url).toEqual("/login");
        expect($state.href(state)).toEqual('#/access/login');        
        
    });
  
  });

  describe('access.callback', function() {
    var state = 'access.callback';
      
    it('configuration test', function() {
        
        var config = $state.get(state);

        expect(config.views.contentView).not.toEqual(undefined);
        expect(config.views.contentView.templateUrl).toEqual("modules/main/partials/loginCallback.html");
        expect(config.views.contentView.controller).toEqual("AccessLoginCallbackController as callbackCtrl");        
        expect(config.url).toEqual("/callback");
        expect($state.href(state)).toEqual('#/access/callback');        
        
    });
  
  });

  describe('app', function() {
    var state = 'app';
      
    it('configuration test', function() {
        
        var config = $state.get(state);

        expect(config.views.pageView).not.toEqual(undefined);
        expect(config.views.pageView.templateUrl).toEqual("modules/main/partials/container.html");
        expect(config.views.pageView.controller).toEqual("AppController");        
        expect(config.url).toEqual("/app");
        expect($state.href(state)).toEqual('#/app');        

    });
  
  });

  describe('app.home', function() {
    var state = 'app.home';
      
    it('configuration test', function() {
        
        var config = $state.get(state);

        expect(config.views.contentView).not.toEqual(undefined);
        expect(config.views.contentView.templateUrl).toEqual("modules/home/partials/container.html");
        expect(config.views.contentView.controller).toEqual("HomeIndexController as index");        
        expect(config.url).toEqual("/home");
        expect($state.href(state)).toEqual('#/app/home');        

    });
  
  });

});
